import { useCallback, useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import Download01Icon from "@untitled-ui/icons-react/build/esm/Download01";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import Upload01Icon from "@untitled-ui/icons-react/build/esm/Upload01";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  Container,
  LinearProgress,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { usePageView } from "../../../hooks/use-page-view";
import { Layout as DashboardLayout } from "../../../layouts/dashboard";
import { CustomerListSearch } from "../../../sections/dashboard/customer/customer-list-search";
import { CustomerListTable } from "../../../sections/dashboard/customer/customer-list-table";
import { useGetAllUsers } from "../../../hooks/use-user";
import usePagination from "../../../hooks/use-pagination";
import { paths } from "../../../paths";
import useTranslateCustomer from "../../../hooks/use-translate-customer";
import { useDebounce } from "use-debounce";

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
  const { handleChangeLimit, handleChangePage, limit, page } = usePagination({
    limit: 10,
    page: 1,
  });
  const { users, isLoadingUsers, isSuccessUsers, isErrorUsers } =
    useGetAllUsers({
      search: queryDebounced,
      sortBy: search.sortBy,
      sortDir: search.sortDir,
      limit,
      page,
    });

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
                {/* <Stack alignItems="center" direction="row" spacing={1}>
                  <Button
                    color="inherit"
                    size="small"
                    startIcon={
                      <SvgIcon>
                        <Upload01Icon />
                      </SvgIcon>
                    }
                  >
                    {customerTranslation.heading.importFile}
                  </Button>
                  <Button
                    color="inherit"
                    size="small"
                    startIcon={
                      <SvgIcon>
                        <Download01Icon />
                      </SvgIcon>
                    }
                  >
                    {customerTranslation.heading.exportFile}
                  </Button>
                </Stack> */}
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
            {/* Users Loading  */}
            {isLoadingUsers && <LinearProgress />}
            <Card>
              <CustomerListSearch
                onFiltersChange={handleFiltersChange}
                onSortChange={handleSortChange}
                sortBy={search.sortBy}
                sortDir={search.sortDir}
              />
              {isSuccessUsers && (
                <CustomerListTable
                  users={users.paginatedList?.filter(
                    (customer) =>
                      customer.roles.length >= 1 &&
                      customer.roles[0] !== "Driver"
                  )}
                  customersCount={users?.totalCount || 0}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleRowsPerPageChange}
                  rowsPerPage={limit}
                  page={page}
                />
              )}
              {(isErrorUsers || users === null) && (
                <Alert severity="warning">
                  <AlertTitle>
                    {customerTranslation.notFoundUsers.title}
                  </AlertTitle>
                  {customerTranslation.notFoundUsers.description}
                </Alert>
              )}
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
