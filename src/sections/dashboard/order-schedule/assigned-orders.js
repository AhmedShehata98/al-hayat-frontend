import { Alert, Grid, Stack, Typography } from "@mui/material";
import OrderScheduleCard from "./order-schedule-card";
import useTranslateOrderSchedule from "../../../hooks/use-translate-order-schedule";

const AssignedOrders = ({ isSuccessOrders, orders }) => {
  const {
    translatedScheduledOrders: { assignedOrdersHeading },
  } = useTranslateOrderSchedule();
  return (
    <Stack
      sx={{
        marginTop: "1.5rem",
        marginBottom: "2rem",
      }}
    >
      <Typography variant="subtitle1" textTransform={"uppercase"}>
        {assignedOrdersHeading.title}
      </Typography>
      <Grid container sx={{ width: "100%" }} marginTop={3} spacing={1}>
        {isSuccessOrders &&
          orders?.map((order) => (
            <Grid key={order.id} item xs={12} sm={6} md={6} lg={3}>
              <OrderScheduleCard order={order} />
            </Grid>
          ))}
      </Grid>
      {isSuccessOrders && orders.length <= 0 && (
        <Grid container justifyContent={"center"} paddingY={8}>
          <Grid item xs={10} md={8} lg={6}>
            <Alert severity="info">{assignedOrdersHeading.notFoundMsg}</Alert>
          </Grid>
        </Grid>
      )}
    </Stack>
  );
};

export default AssignedOrders;