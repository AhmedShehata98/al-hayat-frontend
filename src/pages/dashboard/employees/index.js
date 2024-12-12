import { Layout as DashboardLayout } from "../../../layouts/dashboard";
import Head from "next/head";
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import NextLink from "next/link";
import { paths } from "../../../paths";
import { CustomerListSearch } from "../../../sections/dashboard/customer/customer-list-search";
import { EmployeesListTable } from "../../../sections/dashboard/employee/employee-list-table";
import useEmployeeTranslations from "../../../hooks/use-translate-employee";
import { useCallback, useState } from "react";
import { useDebounce } from "use-debounce";
import usePagination from "../../../hooks/use-pagination";
import { usePageView } from "../../../hooks/use-page-view";
import { QUERY_KEY } from "../../../constants/query-keys";
import { useRecoilValue } from "recoil";
import { authAtom } from "../../../atoms/auth-atom";
import DataListRender from "../../../components/DataListRender";
import { usersServices } from "../../../api/users";

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

const EmployeesPage = (props) => {
  const employeeTranslation = useEmployeeTranslations();
  const { token } = useRecoilValue(authAtom);
  const { search, updateSearch } = useSearch();
  const [queryDebounced] = useDebounce(search.filters.query, 400);
  const { handleChangeLimit, handleChangePage, limit, page } = usePagination({
    limit: 10,
    page: 1,
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
        <title>Dashboard: employees List | Devias Kit PRO</title>
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
                  {employeeTranslation.heading.title}
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
                  href={paths.dashboard.employee.create}
                  variant="contained"
                >
                  {employeeTranslation.heading.ctaBtn}
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
              title={employeeTranslation.heading.title}
              queryKey={[
                QUERY_KEY.EMPLOYEES,
                queryDebounced,
                search.sortBy,
                search.sortDir,
                limit,
                page,
                token,
              ]}
              queryFn={() =>
                usersServices.getAllEmployees(
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
              {({ data }) => (
                <EmployeesListTable
                  employees={data.contentList[0].paginatedList}
                  employeesCount={data.contentList[0].totalCount || 0}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleRowsPerPageChange}
                  rowsPerPage={limit}
                  page={data.contentList[0].currentPage}
                />
              )}
            </DataListRender>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

EmployeesPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default EmployeesPage;
