import { useCallback, useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { usePageView } from "../../../hooks/use-page-view";
import { Layout as DashboardLayout } from "../../../layouts/dashboard";
import { CustomerListSearch } from "../../../sections/dashboard/customer/customer-list-search";
import { CustomerListTable } from "../../../sections/dashboard/customer/customer-list-table";
import usePagination from "../../../hooks/use-pagination";
import { paths } from "../../../paths";
import useTranslateCustomer from "../../../hooks/use-translate-customer";
import { useDebounce } from "use-debounce";
import DataListRender from "../../../components/DataListRender";
import { useRecoilValue } from "recoil";
import { authAtom } from "../../../atoms/auth-atom";
import { usersServices } from "../../../api/users";
import { ROLES } from "../../../constants/roles";
import { QUERY_KEY } from "../../../constants/query-keys";

const useSearch = () => {
  const [search, setSearch] = useState({
    filters: {
      query: undefined,
      hasAcceptedMarketing: undefined,
      isProspect: undefined,
      isReturning: undefined,
    },
    page: 0,
    rowsPerPage: 5,
    sortBy: "firstName",
    sortDir: "desc",
  });

  return {
    search,
    updateSearch: setSearch,
  };
};

const Page = () => {
  const { search, updateSearch } = useSearch();
  const [queryDebounced] = useDebounce(search.filters.query, 400);
  const customerTranslation = useTranslateCustomer();
  const { token } = useRecoilValue(authAtom);

  const { handleChangeLimit, handleChangePage, limit, page } = usePagination({
    limit: 10,
    page: 1,
  });
  // const { users, isLoadingUsers, isSuccessUsers, isErrorUsers } =
  //   useGetAllUsers({
  //     search: queryDebounced,
  //     sortBy: search.sortBy,
  //     sortDir: search.sortDir,
  //     limit,
  //     page,
  //   });

  usePageView();

  const handleFiltersChange = useCallback(
    (filters) => {
      updateSearch((prevState) => ({
        ...prevState,
        filters,
      }));
    },
    [updateSearch]
  );

  const handleSortChange = useCallback(
    ({ sortBy, sortDir }) => {
      updateSearch((prevState) => ({
        ...prevState,
        sortBy,
        sortDir,
      }));
    },
    [updateSearch]
  );
  console.log(search.sortBy, search.sortDir);

  const handlePageChange = useCallback(
    (event, page) => {
      if (page < 1) return;
      handleChangePage(page);
    },
    [handleChangePage]
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      handleChangeLimit(parseInt(event.target.value, 10));
    },
    [handleChangeLimit]
  );

  return (
    <>
      <Head>
        <title>Dashboard: Customer List | Devias Kit PRO</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={4}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">
                  {customerTranslation.heading.title}
                </Typography>
              </Stack>
              <Stack alignItems="center" direction="row" spacing={3}>
                <Button
                  startIcon={
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  }
                  LinkComponent={NextLink}
                  href={paths.dashboard.customers.create}
                  variant="contained"
                >
                  {customerTranslation.heading.ctaBtn}
                </Button>
              </Stack>
            </Stack>
            <CustomerListSearch
              onFiltersChange={handleFiltersChange}
              onSortChange={handleSortChange}
              sortBy={search.sortBy}
              sortDir={search.sortDir}
            />
            <DataListRender
              dataExtractor={(data) => data.contentList[0].paginatedList}
              enabled={true}
              title={customerTranslation.heading.title}
              queryKey={[
                QUERY_KEY.USERS,
                queryDebounced,
                search.sortBy,
                search.sortDir,
                token,
                limit,
                page,
              ]}
              queryFn={() =>
                usersServices.getAllUsers(
                  {
                    search: queryDebounced,
                    sortBy: search.sortBy,
                    sortDir: search.sortDir,
                    limit,
                    page,
                  },
                  token
                )
              }
            >
              {({ data }) => {
                const customers = data.contentList[0].paginatedList?.filter(
                  (customer) =>
                    customer.roles.length >= 1 &&
                    customer.roles[0] !== ROLES.DRIVER
                );

                return (
                  <CustomerListTable
                    users={customers}
                    customersCount={data?.contentList[0].totalPages || 0}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                    rowsPerPage={limit}
                    page={data?.contentList[0].currentPage || page}
                  />
                );
              }}
            </DataListRender>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
