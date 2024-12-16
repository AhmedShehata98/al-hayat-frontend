import {
  Alert,
  AlertTitle,
  Box,
  Breadcrumbs,
  Container,
  LinearProgress,
  Link,
  Pagination,
  Snackbar,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { useCallback, useMemo, useState } from "react";
import { BreadcrumbsSeparator } from "../../../components/breadcrumbs-separator";
import NextLink from "next/link";
import { paths } from "../../../paths";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import { Layout as DashboardLayout } from "../../../layouts/dashboard";
import { useAssignDrivers, useGetAllOrders } from "../../../hooks/use-orders";
import usePagination from "../../../hooks/use-pagination";
import NonAssignedOrders from "../../../sections/dashboard/order-schedule/non-assigned-orders";
import AssignedOrders from "../../../sections/dashboard/order-schedule/assigned-orders";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { autoAssignOrders, ORDER_STATUS } from "../../../utils/orders-helpers";
import { useGetAllDriversUsers } from "../../../hooks/use-user";
import useTranslateOrderSchedule from "../../../hooks/use-translate-order-schedule";
import { useRecoilState } from "recoil";
import { scheduledOrderAtom } from "../../../atoms/schedule-orders-atom";
import useSnackbar from "../../../hooks/use-snackbar";
import useTranslateNetworkMessages from "../../../hooks/use-translate-network-msgs.js";

const ScheduledOrderPage = () => {
  const [{ assignmentOrders }, setAssignmentOrders] =
    useRecoilState(scheduledOrderAtom);
  const { translatedScheduledOrders } = useTranslateOrderSchedule();
  const { noFoundResources, currentLang } = useTranslateNetworkMessages();
  const [assignOrderMethod, setAssignOrderMethod] = useState("MANUAL"); // <"MANUAL" | "AUTO">
  const {
    anchorOrigin,
    handleCloseSnackbar,
    handleOpenSnackbar,
    openSnackbar,
    translatedToast,
    autoHideDuration,
  } = useSnackbar();
  const { page, limit, handleChangeLimit, handleChangePage } = usePagination({
    limit: 10,
    page: 1,
  });

  const {
    page: driversPage,
    limit: driversLimit,
    handleChangeLimit: handleChangeDriversLimit,
    handleChangePage: changeDriversPage,
  } = usePagination({ limit: 10, page: 1 });

  const { assignOrderDriversAsync, isPendingAssign } = useAssignDrivers();

  //TODO: handle how to paginate drivers list
  const { orders, isErrorOrders, isPendingOrders, isSuccessOrders, errorMsg } =
    useGetAllOrders({
      limit,
      page,
      search: undefined,
      sortDirection: undefined,
      sortOrder: undefined,
      status: ORDER_STATUS.get(0),
    });

  const { drivers, isSuccessGettingDriversUsers } = useGetAllDriversUsers({
    limit: driversLimit,
    page: driversPage,
  });

  const assignedOrdersList = useMemo(
    () =>
      isSuccessOrders
        ? orders.paginatedList.filter((order) => order.employeeId !== null)
        : [],
    [orders, isSuccessOrders]
  );
  const nonAssignedOrdersList = useMemo(
    () =>
      isSuccessOrders
        ? orders.paginatedList.filter((order) => order.employeeId === null)
        : [],
    [orders, isSuccessOrders]
  );

  const handleChangeDriversPage = useCallback(
    (page) => {
      changeDriversPage(page);
    },
    [changeDriversPage]
  );

  const handleSetAssignmentOrder = useCallback(
    (order) => {
      setAssignmentOrders((prevOrders) => {
        // Checking if order is already in the assignment list to avoid two or more drivers have a same order
        const assignmentOrderIdx = prevOrders.assignmentOrders.findIndex(
          (item) => item.orderId === order.orderId
        );
        if (assignmentOrderIdx === -1) {
          return { assignmentOrders: [prevOrders.assignmentOrders, order] };
        } else {
          const newOrders = [...prevOrders];
          newOrders.assignmentOrders[assignmentOrderIdx] = order.orderId;

          return newOrders;
        }
      });
    },
    [setAssignmentOrders]
  );

  const handleAutoAssignOrders = useCallback(async () => {
    try {
      const autoAssignOrdersList = autoAssignOrders(
        nonAssignedOrdersList,
        drivers.paginatedList
      );
      setAssignmentOrders({ assignmentOrders: [] });
      setAssignOrderMethod("AUTO");
      handleSetAssignmentOrder(autoAssignOrdersList);
      await assignOrderDriversAsync(autoAssignOrdersList);
      handleOpenSnackbar({
        message: translatedToast.assignScheduledOrders,
        severity: "success",
      });
    } catch (error) {
      handleOpenSnackbar({
        message: translatedToast.errorMsg,
        severity: "error",
      });
      console.error(error);
    }
  }, [
    handleSetAssignmentOrder,
    assignOrderDriversAsync,
    nonAssignedOrdersList,
    drivers,
    translatedToast,
    handleOpenSnackbar,
    setAssignmentOrders,
  ]);

  const handleSubmitManual = useCallback(async () => {
    try {
      setAssignOrderMethod("MANUAL");
      await assignOrderDriversAsync(assignmentOrders);
      handleOpenSnackbar({
        message: translatedToast.assignScheduledOrders,
        severity: "success",
      });
    } catch (error) {
      handleOpenSnackbar({
        message: translatedToast.errorMsg,
        severity: "error",
      });
      console.error(error);
    }
  }, [
    assignOrderDriversAsync,
    handleOpenSnackbar,
    translatedToast,
    assignmentOrders,
  ]);

  return (
    <>
      <Head>Dashboard : order schedule List</Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          {/* Heading */}
          <Stack spacing={4}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">
                  {translatedScheduledOrders.headingTitle}
                </Typography>
                <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                  <Link
                    color="text.primary"
                    component={NextLink}
                    href={paths.dashboard.index}
                    variant="subtitle2"
                  >
                    {translatedScheduledOrders.breadcrumb.dashboard}
                  </Link>
                  <Link
                    color="text.primary"
                    component={NextLink}
                    href={paths.dashboard.orderSchedule.index}
                    variant="subtitle2"
                  >
                    {translatedScheduledOrders.headingTitle}
                  </Link>
                  <Typography color="text.secondary" variant="subtitle2">
                    {translatedScheduledOrders.breadcrumb.ordersScheduled}
                  </Typography>
                </Breadcrumbs>
              </Stack>
              <Stack alignItems="center" direction="row" spacing={3}>
                <LoadingButton
                  startIcon={
                    <SvgIcon>
                      <AutoFixHighIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  color="secondary"
                  onClick={handleAutoAssignOrders}
                  loading={isPendingAssign && assignOrderMethod === "AUTO"}
                >
                  {translatedScheduledOrders.actions.autoAssign}
                </LoadingButton>
                <LoadingButton
                  startIcon={
                    <SvgIcon>
                      <SendIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  onClick={handleSubmitManual}
                  loading={isPendingAssign && assignOrderMethod === "MANUAL"}
                >
                  {translatedScheduledOrders.actions.submit}
                </LoadingButton>
              </Stack>
            </Stack>
          </Stack>
          {/*End Heading */}
          {isPendingOrders && <LinearProgress />}
          {!isErrorOrders && (
            <>
              <NonAssignedOrders
                orders={nonAssignedOrdersList}
                isSuccessOrders={isSuccessOrders}
                drivers={drivers}
                isSuccessGettingDriversUsers={isSuccessGettingDriversUsers}
                onPageChange={handleChangeDriversPage}
              />
              <AssignedOrders
                orders={assignedOrdersList}
                isSuccessOrders={isSuccessOrders}
              />
              <Pagination
                count={orders?.totalPages}
                variant="outlined"
                sx={{
                  mt: 10,
                }}
                color="secondary"
                page={page}
                onChange={(_evt, value) => handleChangePage(value)}
              />
            </>
          )}
          {isErrorOrders && (
            <Stack paddingY={6}>
              <Alert severity="error">
                <AlertTitle>
                  {noFoundResources.title.replace(
                    "{resourceName}",
                    currentLang === "ar" ? "طلبيات" : "orders"
                  )}
                </AlertTitle>
                {noFoundResources.message.replace(
                  "{resourceName}",
                  currentLang === "ar" ? "طلبيات" : "orders"
                )}
              </Alert>
            </Stack>
          )}
        </Container>
      </Box>
      <Snackbar
        open={openSnackbar.open}
        autoHideDuration={autoHideDuration}
        anchorOrigin={anchorOrigin}
        onClose={handleCloseSnackbar}
      >
        <Alert severity={openSnackbar.severity}>{openSnackbar.message}</Alert>
      </Snackbar>
    </>
  );
};
ScheduledOrderPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default ScheduledOrderPage;
