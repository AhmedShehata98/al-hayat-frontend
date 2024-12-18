import { useCallback } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  Divider,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { PropertyList } from "../../../components/property-list";
import { PropertyListItem } from "../../../components/property-list-item";
import { useTranslation } from "react-i18next";
import {
  ORDER_STATUS,
  PAYMENT_STATUS,
  getOrderStatusColor,
} from "../../../utils/orders-helpers";
import useTranslateOrders from "../../../hooks/use-translate-orders";
import { useCancelOrder } from "../../../hooks/use-orders";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";
import { paths } from "../../../paths";
import useDateFormat from "../../../hooks/use-date.format";
import useNumberFormat from "../../../hooks/use-number-format";

export const OrderSummary = (props) => {
  const {
    translatedOrders: { detailsPage: detailsPageTranslation, filters },
  } = useTranslateOrders();
  const { order, translatedToast, handleOpenSnackbar, ...other } = props;
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const [_, translation] = useTranslation();
  const { cancelOrderAsync, isPendingCancel } = useCancelOrder();
  const router = useRouter();
  const { formatDate } = useDateFormat();
  const { formatCurrency } = useNumberFormat();

  const handleCancelOrder = useCallback(async () => {
    try {
      await cancelOrderAsync(order.id);
      handleOpenSnackbar({
        message: translatedToast.orderCancelSuccess.replace(
          "@",
          `#${order.id}`
        ),
        severity: "success",
      });
      router.push(paths.dashboard.orders.index);
    } catch (error) {
      handleOpenSnackbar({
        message: translatedToast.orderCancelError,
        severity: "error",
      });
      console.error(error);
    }
  }, [order.id, translatedToast, router, cancelOrderAsync, handleOpenSnackbar]);

  const align = mdUp ? "horizontal" : "vertical";
  const createdAt = formatDate(order?.orderDate);
  const totalAmount = formatCurrency(order.total || 0);
  const statusColor = getOrderStatusColor(order.orderStatus);

  return (
    <Card {...other}>
      <CardHeader title={detailsPageTranslation.headingTitle} />
      <Divider />
      <PropertyList>
        <PropertyListItem
          align={align}
          label={detailsPageTranslation.customerName}
        >
          <Typography variant="subtitle2">
            {order?.customer?.firstName
              ? `${order?.customer?.firstName} ${order?.customer?.lastName}`
              : order?.customer?.phoneNumber}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {`${order.address?.adressLine2} ${order.address?.adressLine1} - ${order.address?.city}, ${order.address?.country}`}
          </Typography>
        </PropertyListItem>
        <Divider />
        <PropertyListItem align={align} label="ID" value={order.id} />
        <Divider />
        <PropertyListItem
          align={align}
          label={detailsPageTranslation.invoice}
          value={order.number || "NA"}
        />
        <Divider />
        <PropertyListItem
          align={align}
          label={detailsPageTranslation.orderDate}
          value={createdAt}
        />
        <Divider />
        <PropertyListItem
          align={align}
          label={detailsPageTranslation.promotionCode}
          value={
            order?.couponCode?.voucherId || detailsPageTranslation.noPromotion
          }
        />
        <Divider />
        <PropertyListItem
          align={align}
          label={detailsPageTranslation.totalAmount}
          value={totalAmount}
        />
        <Divider />

        <PropertyListItem
          align={align}
          label={detailsPageTranslation.paymentStatus}
          value={PAYMENT_STATUS.get(order.paymentStatus)}
        />

        <Divider />
        <PropertyListItem
          align={align}
          label={detailsPageTranslation.orderStatus}
        >
          <Stack
            alignItems={{
              xs: "stretch",
              sm: "center",
              md: "flex-start",
            }}
            direction={{
              xs: "column",
              sm: "row",
            }}
            spacing={1}
          >
            <Paper
              sx={{
                width: "fit-content",
                paddingX: "1rem",
                paddingY: "0.5rem",
                borderRadius: "50px",
                backgroundColor: statusColor,
                color: "#111",
              }}
            >
              <Typography variant="subtitle1">
                {
                  filters[
                    ORDER_STATUS.get(order.orderStatus)
                      .toLowerCase()
                      .replace(" ", "")
                  ]
                }
              </Typography>
            </Paper>
          </Stack>
        </PropertyListItem>
        <Stack sx={{ paddingX: "2rem", paddingBottom: "1rem" }}>
          <LoadingButton
            sx={{
              marginInlineStart: "auto",
              marginTop: "2rem",
            }}
            variant="contained"
            color="error"
            onClick={handleCancelOrder}
            loading={isPendingCancel}
          >
            {detailsPageTranslation.actions.cancel}
          </LoadingButton>
        </Stack>
      </PropertyList>
    </Card>
  );
};

OrderSummary.propTypes = {
  // @ts-ignore
  order: PropTypes.object.isRequired,
};
