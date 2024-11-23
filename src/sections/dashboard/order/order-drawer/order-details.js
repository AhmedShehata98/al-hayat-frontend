import PropTypes from "prop-types";
import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { PropertyList } from "../../../../components/property-list";
import { PropertyListItem } from "../../../../components/property-list-item";
import { Scrollbar } from "../../../../components/scrollbar";
import {
  ORDER_STATUS,
  getOrderStatusColor,
} from "../../../../utils/orders-helpers";
import useTranslateOrders from "../../../../hooks/use-translate-orders";
import useNumberFormat from "../../../../hooks/use-number-format";
import useDateFormat from "../../../../hooks/use-date.format";

export const OrderDetails = (props) => {
  const { translatedOrders } = useTranslateOrders();
  const { formatCurrency } = useNumberFormat();
  const { formatDate } = useDateFormat();
  const { onApprove, onEdit, onReject, order } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const align = lgUp ? "horizontal" : "vertical";
  const items = order.orderItems || [];
  const createdAt = formatDate(order.orderDate);
  const statusColor = getOrderStatusColor(order.orderStatus);
  const totalAmount = formatCurrency(order.total || 0);

  return (
    <Stack spacing={6}>
      <Stack spacing={3}>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Typography variant="h6">
            {translatedOrders.drawer.headingTitle}
          </Typography>
        </Stack>
        <PropertyList>
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label={translatedOrders.drawer.orderNo}
            value={order.id}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label={translatedOrders.drawer.customerName}
          >
            <Typography color="text.secondary" variant="body2">
              {`${order.customer.firstName} ${order.customer.lastName}`}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {order.customer.address1}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {order.customer.city}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {order.customer.country}
            </Typography>
          </PropertyListItem>
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label={translatedOrders.drawer.orderDate}
            value={createdAt}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label={translatedOrders.drawer.promotionCode}
            value={
              order?.couponCode?.voucherId ||
              translatedOrders.drawer.noPromotion
            }
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label={translatedOrders.drawer.totalAmount}
            value={totalAmount}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label={translatedOrders.drawer.status}
          >
            <Paper
              sx={{
                width: "fit-content",
                paddingX: "1rem",
                paddingY: "0.5rem",
                borderRadius: "50px",
                backgroundColor: statusColor,
                color: "#111",
                marginInlineStart: "auto",
              }}
            >
              <Typography variant="subtitle1">
                {
                  translatedOrders.filters[
                    ORDER_STATUS.get(order.orderStatus)
                      .toLowerCase()
                      .replace(" ", "")
                  ]
                }
              </Typography>
            </Paper>
          </PropertyListItem>
        </PropertyList>
        <Stack
          alignItems="center"
          direction="row"
          flexWrap="wrap"
          justifyContent="flex-end"
          spacing={2}
        >
          {/* <Button onClick={onApprove} size="small" variant="contained">
            Approve
          </Button> */}
          <Button
            color="error"
            onClick={onReject}
            size="small"
            variant="outlined"
          >
            {translatedOrders.drawer.actions.cancel}
          </Button>
        </Stack>
      </Stack>
      <Stack spacing={3}>
        <Typography variant="h6">
          {translatedOrders.drawer.lineItems.title}
        </Typography>
        <Scrollbar>
          <Table sx={{ minWidth: 400 }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  {translatedOrders.drawer.lineItems.description}
                </TableCell>
                <TableCell>
                  {translatedOrders.drawer.lineItems.amount}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => {
                const unitAmount = formatCurrency(
                  item.product.price * item.quantity || 0
                );

                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      {item.product.name} x {item.quantity}
                    </TableCell>
                    <TableCell>{unitAmount}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Scrollbar>
      </Stack>
    </Stack>
  );
};

OrderDetails.propTypes = {
  onApprove: PropTypes.func,
  onEdit: PropTypes.func,
  onReject: PropTypes.func,
  // @ts-ignore
  order: PropTypes.object,
};
