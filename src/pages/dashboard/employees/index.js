import {Layout as DashboardLayout} from "../../../layouts/dashboard";
import Page from "../customers";
import Head from "next/head";
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
    Typography
} from "@mui/material";
import Upload01Icon from "@untitled-ui/icons-react/build/esm/Upload01";
import Download01Icon from "@untitled-ui/icons-react/build/esm/Download01";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import NextLink from "next/link";
import {paths} from "../../../paths";
import {CustomerListSearch} from "../../../sections/dashboard/customer/customer-list-search";
import {EmployeesListTable} from "../../../sections/dashboard/employee/employee-list-table";
import useEmployeeTranslations from "../../../hooks/use-translate-employee";
import {useCallback, useState} from "react";
import {useDebounce} from "use-debounce";
import useTranslateCustomer from "../../../hooks/use-translate-customer";
import usePagination from "../../../hooks/use-pagination";
import {useGetAllEmployees} from "../../../hooks/use-user";
import {usePageView} from "../../../hooks/use-page-view";

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

const EmployeesPage = (props) =>{
    const employeeTranslation = useEmployeeTranslations()
    const { search, updateSearch } = useSearch();
    const [queryDebounced] = useDebounce(search.filters.query, 400);
    const { handleChangeLimit, handleChangePage, limit, page } = usePagination({
        limit: 10,
        page: 1,
    });
    const { employees,errorEmployees,isErrorEmployees,isLoadingEmployees,isSuccessEmployees } =
        useGetAllEmployees({
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
                                {/*<Stack alignItems="center" direction="row" spacing={1}>*/}
                                {/*    <Button*/}
                                {/*        color="inherit"*/}
                                {/*        size="small"*/}
                                {/*        startIcon={*/}
                                {/*            <SvgIcon>*/}
                                {/*                <Upload01Icon />*/}
                                {/*            </SvgIcon>*/}
                                {/*        }*/}
                                {/*    >*/}
                                {/*        {employeeTranslation.heading.importFile}*/}
                                {/*    </Button>*/}
                                {/*    <Button*/}
                                {/*        color="inherit"*/}
                                {/*        size="small"*/}
                                {/*        startIcon={*/}
                                {/*            <SvgIcon>*/}
                                {/*                <Download01Icon />*/}
                                {/*            </SvgIcon>*/}
                                {/*        }*/}
                                {/*    >*/}
                                {/*        {employeeTranslation.heading.exportFile}*/}
                                {/*    </Button>*/}
                                {/*</Stack>*/}
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
                        {/* Users Loading  */}
                        {isLoadingEmployees && <LinearProgress />}
                        <Card>
                            <CustomerListSearch
                                onFiltersChange={handleFiltersChange}
                                onSortChange={handleSortChange}
                                sortBy={search.sortBy}
                                sortDir={search.sortDir}
                            />
                            {isSuccessEmployees && (
                                <EmployeesListTable
                                    employees={employees.paginatedList}
                                    employeesCount={employees?.totalCount || 0}
                                    onPageChange={handlePageChange}
                                    onRowsPerPageChange={handleRowsPerPageChange}
                                    rowsPerPage={limit}
                                    page={page}
                                />
                            )}
                            {(isErrorEmployees || employees === null) && (
                                <Alert severity="warning">
                                    <AlertTitle>
                                        {employeeTranslation.notFoundUsers.title}
                                    </AlertTitle>
                                    {employeeTranslation.notFoundUsers.description}
                                </Alert>
                            )}
                        </Card>
                    </Stack>
                </Container>
            </Box>
        </>
    );
}

EmployeesPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default EmployeesPage ;

