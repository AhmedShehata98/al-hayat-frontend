import { useCallback, useEffect, useState } from "react";
import NextLink from "next/link";
import Head from "next/head";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import ChevronDownIcon from "@untitled-ui/icons-react/build/esm/ChevronDown";
import Edit02Icon from "@untitled-ui/icons-react/build/esm/Edit02";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Link,
  Stack,
  SvgIcon,
  Tab,
  Tabs,
  Typography,
  Unstable_Grid2 as Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import { customersApi } from "../../../../api/customers";
import { useMounted } from "../../../../hooks/use-mounted";
import { usePageView } from "../../../../hooks/use-page-view";
import { Layout as DashboardLayout } from "../../../../layouts/dashboard";
import { paths } from "../../../../paths";
import { EmployeeBasicDetails } from "../../../../sections/dashboard/employee/employee-basic-details";
import { CustomerDataManagement } from "../../../../sections/dashboard/customer/customer-data-management";
import { CustomerInvoices } from "../../../../sections/dashboard/customer/customer-invoices";
import { CustomerLogs } from "../../../../sections/dashboard/customer/customer-logs";
import { getInitials } from "../../../../utils/get-initials";
import { useDeleteUser, useGetUserById } from "../../../../hooks/use-user";
import { usePathname } from "next/navigation";
import useTranslateEmployee from "../../../../hooks/use-translate-employee";
import { useRouter } from "next/router";
import useSnackbar from "../../../../hooks/use-snackbar";

const useInvoices = () => {
  const isMounted = useMounted();
  const [invoices, setInvoices] = useState([]);

  const getInvoices = useCallback(async () => {
    try {
      const response = await customersApi.getInvoices();

      if (isMounted()) {
        setInvoices(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      getInvoices();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return invoices;
};

const useLogs = () => {
  const isMounted = useMounted();
  const [logs, setLogs] = useState([]);

  const getLogs = useCallback(async () => {
    try {
      const response = await customersApi.getLogs();

      if (isMounted()) {
        setLogs(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      getLogs();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return logs;
};

const EmployeeDetailsPage = () => {
  const [currentTab, setCurrentTab] = useState("details");
  const invoices = useInvoices();
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useGetUserById(pathname?.split("/").at(-1));
  const logs = useLogs();
  const employeeTranslation = useTranslateEmployee();
  const {
    anchorOrigin,
    handleCloseSnackbar,
    handleOpenSnackbar,
    openSnackbar,
    translatedToast,
    autoHideDuration,
  } = useSnackbar();
  const tabs = [
    { label: employeeTranslation.detailsPage.tabs.details, value: "details" },
  ];
  usePageView();

  const { deleteUserAsync, isLoading } = useDeleteUser();

  const handleDeleteUser = useCallback(async () => {
    try {
      await deleteUserAsync(user.id);
      handleOpenSnackbar({
        message: translatedToast.deleteUser.replace(
          "@",
          `# ${user.firstName} ${user.lastName}`
        ),
        security: "success",
      });
      router.push(paths.dashboard.customers.index);
    } catch (error) {
      handleOpenSnackbar({
        message: translatedToast.errorMsg,
        security: "error",
      });
    }
  }, [deleteUserAsync, handleOpenSnackbar, translatedToast, router, user]);

  const handleTabsChange = useCallback((event, value) => {
    setCurrentTab(value);
  }, []);

  if (!user) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Dashboard: employee Details</title>
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
            <Stack spacing={4}>
              <div>
                <Link
                  color="text.primary"
                  component={NextLink}
                  href={paths.dashboard.customers.index}
                  sx={{
                    alignItems: "center",
                    display: "inline-flex",
                  }}
                  underline="hover"
                >
                  <SvgIcon sx={{ mr: 1 }}>
                    <ArrowLeftIcon />
                  </SvgIcon>
                  <Typography variant="subtitle2">
                    {employeeTranslation.detailsPage.header.goBack}
                  </Typography>
                </Link>
              </div>
              <Stack
                alignItems="flex-start"
                direction={{
                  xs: "column",
                  md: "row",
                }}
                justifyContent="space-between"
                spacing={4}
              >
                <Stack alignItems="center" direction="row" spacing={2}>
                  <Avatar
                    // src={user.avatar}
                    sx={{
                      height: 64,
                      width: 64,
                    }}
                  >
                    {getInitials(`${user?.firstName} ${user?.lastName}`)}
                  </Avatar>
                  <Stack spacing={1}>
                    <Typography variant="h4">{user.email}</Typography>
                    <Stack alignItems="center" direction="row" spacing={1}>
                      <Typography variant="subtitle2">
                        {employeeTranslation.detailsPage.header.userId}:
                      </Typography>
                      <Chip label={user.id} size="small" />
                    </Stack>
                  </Stack>
                </Stack>
                <Stack alignItems="center" direction="row" spacing={2}>
                  <Button
                    color="inherit"
                    component={NextLink}
                    endIcon={
                      <SvgIcon>
                        <Edit02Icon />
                      </SvgIcon>
                    }
                    href={paths.dashboard.employee.edit.replace(
                      ":employeeId",
                      user.id
                    )}
                  >
                    {employeeTranslation.detailsPage.header.editBtn}
                  </Button>
                  <Button
                    endIcon={
                      <SvgIcon>
                        <ChevronDownIcon />
                      </SvgIcon>
                    }
                    variant="contained"
                  >
                    {employeeTranslation.detailsPage.header.ctaBtn}
                  </Button>
                </Stack>
              </Stack>
              <div>
                <Tabs
                  indicatorColor="primary"
                  onChange={handleTabsChange}
                  scrollButtons="auto"
                  sx={{ mt: 3 }}
                  textColor="primary"
                  value={currentTab}
                  variant="scrollable"
                >
                  {tabs.map((tab) => (
                    <Tab key={tab.value} label={tab.label} value={tab.value} />
                  ))}
                </Tabs>
                <Divider />
              </div>
            </Stack>
            {currentTab === "details" && (
              <div>
                <Grid container spacing={4}>
                  <Grid xs={12} lg={4}>
                    <EmployeeBasicDetails
                      address1={JSON.stringify(user.userAdresses || "NA")}
                      address2={JSON.stringify(user.userAdresses || "NA")}
                      country={JSON.stringify(user.userAdresses || "NA")}
                      currentLocation={user.currentLocation || "NA"}
                      email={user.email}
                      firstName={user.firstName}
                      lastName={user.lastName}
                      username={user.userName}
                      isVerified={!!user.emailConfirmed}
                      phone={user.phoneNumber || "NA"}
                      onDeleteUser={handleDeleteUser}
                      state={JSON.stringify(user.userAdresses || "NA")}
                    />
                  </Grid>
                  <Grid xs={12} lg={8}>
                    <Stack spacing={4}>
                      {/* <CustomerPayment />
                      <CustomerEmailsSummary /> */}
                      <CustomerDataManagement onDeleteUser={handleDeleteUser} />
                    </Stack>
                  </Grid>
                </Grid>
              </div>
            )}
            {currentTab === "invoices" && (
              <CustomerInvoices invoices={invoices} />
            )}
            {currentTab === "logs" && <CustomerLogs logs={logs} />}
          </Stack>
        </Container>
      </Box>
      <Snackbar
        open={openSnackbar.open}
        autoHideDuration={autoHideDuration}
        anchorOrigin={anchorOrigin}
        onClose={handleCloseSnackbar}
      >
        <Alert security={openSnackbar.security}>{openSnackbar.message}</Alert>
      </Snackbar>
    </>
  );
};

EmployeeDetailsPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default EmployeeDetailsPage;
