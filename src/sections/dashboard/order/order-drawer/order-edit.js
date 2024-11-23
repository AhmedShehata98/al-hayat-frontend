import PropTypes from "prop-types";
import { format } from "date-fns";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { ORDER_STATUS } from "../../../../utils/orders-helpers";
import { useTranslation } from "react-i18next";

const statusOptions = [
  {
    label: "Canceled",
    value: "canceled",
  },
  {
    label: "Complete",
    value: "complete",
  },
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "Rejected",
    value: "rejected",
  },
];

export const OrderEdit = (props) => {
  const { onCancel, onSave, order } = props;
  const [_, translation] = useTranslation();
  const createdAt = format(new Date(order.orderDate), "dd/MM/yyyy HH:mm");
  const totalAmount = Intl.NumberFormat(`${translation.language}-SA`, {
    style: "currency",
    currency: "SAR",
  }).format(order.total || 0);

  console.log(Array.from(ORDER_STATUS));
  return (
    <Stack spacing={6}>
      <Stack spacing={3}>
        <Typography variant="h6">Details</Typography>
        <Stack spacing={3}>
          <TextField disabled fullWidth label="ID" name="id" value={order.id} />
          <TextField
            disabled
            fullWidth
            label="Number"
            name="number"
            value={order.number || "NA"}
          />
          <TextField
            disabled
            fullWidth
            label="Customer name"
            name="customer_name"
            value={`${order.customer.firstName} ${order.customer.lastName}`}
          />
          <TextField
            disabled
            fullWidth
            label="Date"
            name="date"
            value={createdAt}
          />
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={order.customer.address1}
          />
          <TextField
            fullWidth
            label="Country"
            name="country"
            value={order.customer.country}
          />
          <TextField
            fullWidth
            label="State/Region"
            name="state_region"
            value={order.customer.city}
          />
          <TextField
            fullWidth
            label="Total Amount"
            name="amount"
            value={totalAmount}
          />
          <TextField
            fullWidth
            label="Status"
            name="status"
            select
            SelectProps={{ native: true }}
            value={ORDER_STATUS.get(order.orderStatus)}
          >
            {Array.from(ORDER_STATUS).map(([key, value]) => (
              <option key={value} value={key}>
                {value}
              </option>
            ))}
          </TextField>
        </Stack>
        <Stack alignItems="center" direction="row" flexWrap="wrap" spacing={2}>
          <Button
            color="primary"
            onClick={onSave}
            size="small"
            variant="contained"
          >
            Save changes
          </Button>
          <Button color="inherit" onClick={onCancel} size="small">
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

OrderEdit.propTypes = {
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  // @ts-ignore
  order: PropTypes.object,
};
