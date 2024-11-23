import { useCallback, useEffect, useState } from "react";
import NextLink from "next/link";
import Head from "next/head";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import CalendarIcon from "@untitled-ui/icons-react/build/esm/Calendar";
import ChevronDownIcon from "@untitled-ui/icons-react/build/esm/ChevronDown";
import Edit02Icon from "@untitled-ui/icons-react/build/esm/Edit02";
import {
  Alert,
  Box,
  Button,
  Container,
  Link,
  Snackbar,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { ordersService } from "../../../api/orders";
import { useMounted } from "../../../hooks/use-mounted";
import { usePageView } from "../../../hooks/use-page-view";
import { Layout as DashboardLayout } from "../../../layouts/dashboard";
import { paths } from "../../../paths";
import { OrderItems } from "../../../sections/dashboard/order/order-items";
import { OrderSummary } from "../../../sections/dashboard/order/order-summary";
import { usePathname } from "next/navigation";
import { useGetOrderById } from "../../../hooks/use-orders";
import useTranslateOrders from "../../../hooks/use-translate-orders";
import useFormatDate from "../../../hooks/use-date.format";
import useSnackbar from "../../../hooks/use-snackbar";

const useOrder = () => {
  const isMounted = useMounted();
  const [order, setOrder] = useState(null);

  const getOrder = useCallback(async () => {
    try {
      const response = await ordersService.getOrder();

      if (isMounted()) {
        setOrder(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      getOrder();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return order;
};

const Page = () => {
  const {
    translatedOrders: { detailsPage: detailsPageTranslation },
  } = useTranslateOrders();
  const { formatDate } = useFormatDate();
  const {
    anchorOrigin,
    autoHideDuration,
    handleCloseSnackbar,
    handleOpenSnackbar,
    openSnackbar,
    translatedToast,
  } = useSnackbar();
  const pathname = usePathname();
  const { order, isErrorGetOrder, isPendingGetOrder, isSuccessGetOrder } =
    useGetOrderById(pathname?.split("/").pop());
  const mockedOrder = useOrder();

  usePageView();

  if (!order) {
    return null;
  }

  const createdAt = formatDate(order.orderDate);

  return (
    <>
      <Head>
        <title>Dashboard: Order Details | Devias Kit PRO</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={4}>
            <div>
              <Link
                color="text.primary"
                component={NextLink}
                href={paths.dashboard.orders.index}
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
                  {detailsPageTranslation.backBtn}
                </Typography>
              </Link>
            </div>
            <div>
              <Stack
                alignItems="flex-start"
                direction="row"
                justifyContent="space-between"
                spacing={3}
              >
                <Stack spacing={1}>
                  <Typography variant="h4">#{order.id}</Typography>
                  <Stack alignItems="center" direction="row" spacing={1}>
                    <Typography color="text.secondary" variant="body2">
                      {detailsPageTranslation.placedOn}
                    </Typography>
                    <SvgIcon color="action">
                      <CalendarIcon />
                    </SvgIcon>
                    <Typography variant="body2">{createdAt}</Typography>
                  </Stack>
                </Stack>
                {/* <div>
                  <Stack alignItems="center" direction="row" spacing={2}>
                    <Button
                      color="inherit"
                      endIcon={
                        <SvgIcon>
                          <Edit02Icon />
                        </SvgIcon>
                      }
                    >
                      {detailsPageTranslation.headerActions.edit}
                    </Button>
                    <Button
                      endIcon={
                        <SvgIcon>
                          <ChevronDownIcon />
                        </SvgIcon>
                      }
                      variant="contained"
                    >
                      {detailsPageTranslation.headerActions.action}
                    </Button>
                  </Stack>
                </div> */}
              </Stack>
            </div>
            {isSuccessGetOrder && (
              <OrderSummary
                order={order}
                handleOpenSnackbar={handleOpenSnackbar}
                translatedToast={translatedToast}
              />
            )}
            <OrderItems items={order.orderItems || []} />
            {/* <OrderLogs logs={mockedOrder.logs || []} /> */}
          </Stack>
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

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
