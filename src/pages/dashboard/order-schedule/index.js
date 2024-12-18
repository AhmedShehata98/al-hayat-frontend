import {
  Alert,
  AlertTitle,
  Box,
  Breadcrumbs,
  Card,
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
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../../../constants/query-keys.js";
import { t } from "i18next";
import { tokens } from "../../../locales/tokens.js";

const ScheduledOrderPage = () => {
  const [{ assignmentOrders }, setAssignmentOrders] =
    useRecoilState(scheduledOrderAtom);
  const { translatedScheduledOrders } = useTranslateOrderSchedule();
  const queryClient = useQueryClient();
  const [assignOrderMethod, setAssignOrderMethod] = useState("MANUAL"); // <"MANUAL" | "AUTO">
  const {
    anchorOrigin,
    handleCloseSnackbar,
    handleOpenSnackbar,
    openSnackbar,
    translatedToast,
    autoHideDuration,
  } = useSnackbar();
  const {
    page: nonAssignedPage,
    limit: nonAssignedLimit,
    handleChangeLimit: handleChangeNonAssignedLimit,
    handleChangePage: handleChangeNonAssignedPage,
  } = usePagination({
    limit: 4,
    page: 1,
  });

  const {
    page: assignedPage,
    limit: assignedLimit,
    handleChangeLimit: handleChangeAssignedLimit,
    handleChangePage: handleChangeAssignedPage,
  } = usePagination({
    limit: 10,
    page: 1,
  });

  const { assignOrderDriversAsync, isPendingAssign } = useAssignDrivers();

  //TODO: handle how to paginate drivers list
  const {
    orders: assignedOrdersList,
    isErrorOrders: isErrorAssignedOrders,
    isPendingOrders: isPendingAssignedOrders,
    isSuccessOrders: isSuccessAssignedOrders,
    errorMsg: assignedOrdersError,
  } = useGetAllOrders({
    limit: assignedLimit,
    page: assignedPage,
    search: undefined,
    sortDirection: undefined,
    sortOrder: undefined,
    status: ORDER_STATUS.get(4),
  });

  const {
    orders: nonAssignedOrdersList,
    isErrorOrders: isErrorNonAssignedOrders,
    isPendingOrders: isPendingNonAssignedOrders,
    isSuccessOrders: isSuccessNonAssignedOrders,
    errorMsg: nonAssignedOrdersError,
  } = useGetAllOrders({
    limit: nonAssignedLimit,
    page: nonAssignedPage,
    search: undefined,
    sortDirection: undefined,
    sortOrder: undefined,
    status: ORDER_STATUS.get(0),
  });

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
      const queryData = queryClient.getQueriesData({
        queryKey: [QUERY_KEY.DRIVERS],
      });
      const drivers = queryData[0][1]?.contentList?.[0]?.paginatedList;
      console.log("drivers: ", drivers);
      console.log("nonAssignedOrdersList: ", nonAssignedOrdersList);

      if (!drivers || drivers.length === 0) {
        console.error("No drivers found");
        return;
      }
      const autoAssignOrdersList = autoAssignOrders(
        nonAssignedOrdersList?.paginatedList,
        drivers
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
          {(isPendingNonAssignedOrders || isPendingAssignedOrders) && (
            <LinearProgress />
          )}

          {isSuccessNonAssignedOrders && (
            <Stack spacing={3}>
              <NonAssignedOrders
                orders={nonAssignedOrdersList.paginatedList}
                isSuccessOrders={isSuccessNonAssignedOrders}
              />
              <Pagination
                count={nonAssignedOrdersList.totalPages}
                variant="outlined"
                sx={{
                  mt: 10,
                }}
                color="secondary"
                page={nonAssignedOrdersList.currentPage || nonAssignedPage}
                onChange={(_evt, value) => handleChangeNonAssignedPage(value)}
              />
            </Stack>
          )}
          {(!nonAssignedOrdersList || isErrorNonAssignedOrders) && (
            <Card sx={{ py: 15 }}>
              <Alert severity="info" sx={{ mx: "auto", width: "fit-content" }}>
                {t(tokens.orderSchedule.nonAssignedOrdersHeading.notfoundMsg)}
              </Alert>
            </Card>
          )}
          {isSuccessAssignedOrders && (
            <Stack spacing={3}>
              <AssignedOrders
                orders={assignedOrdersList?.paginatedList}
                isSuccessOrders={isSuccessAssignedOrders}
              />
              <Pagination
                count={assignedOrdersList?.totalPages}
                variant="outlined"
                sx={{
                  mt: 10,
                }}
                color="secondary"
                page={assignedOrdersList?.currentPage || assignedPage}
                onChange={(_evt, value) => handleChangeAssignedPage(value)}
              />
            </Stack>
          )}
          {(!assignedOrdersList || isErrorAssignedOrders) && (
            <Card sx={{ py: 15 }}>
              <Alert severity="info" sx={{ mx: "auto", width: "fit-content" }}>
                {t(tokens.orderSchedule.assignedOrdersHeading.notfoundMsg)}
              </Alert>
            </Card>
          )}
          {/* {isErrorOrders && (
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
          )} */}
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
