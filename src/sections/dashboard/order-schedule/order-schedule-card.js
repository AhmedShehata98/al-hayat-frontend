import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import {
  ORDER_STATUS,
  getOrderStatusColor,
} from "../../../utils/orders-helpers";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useTranslateOrderSchedule from "../../../hooks/use-translate-order-schedule";
import useTranslateOrders from "../../../hooks/use-translate-orders";
import useFormatDate from "../../../hooks/use-date.format";
import useFormatNumber from "../../../hooks/use-number-format";
import { scheduledOrderAtom } from "../../../atoms/schedule-orders-atom";
import { useRecoilState } from "recoil";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useGetAllDriversUsers } from "../../../hooks/use-user";
import usePagination from "../../../hooks/use-pagination";
import { useInView } from "react-intersection-observer";
import { t } from "i18next";
import { tokens } from "../../../locales/tokens";

const OrderScheduleCard = ({ order }) => {
  const [{ assignmentOrders }, setAssignmentOrders] =
    useRecoilState(scheduledOrderAtom);
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const [employeeValue, setEmployeeValue] = useState(null);
  const {
    page: driversPage,
    limit: driversLimit,
    handleChangeLimit: handleChangeDriversLimit,
    handleChangePage: changeDriversPage,
  } = usePagination({ limit: 6, page: 1 });

  const { drivers, isSuccessGettingDriversUsers, isGettingDriversUsers } =
    useGetAllDriversUsers({
      limit: driversLimit,
      page: driversPage,
      enabled: order.employeeId === null,
    });

  const { formatDate } = useFormatDate();
  const { formatCurrency } = useFormatNumber();
  const {
    translatedScheduledOrders: { card: translatedCard },
  } = useTranslateOrderSchedule();
  const {
    translatedOrders: { filters },
  } = useTranslateOrders();

  const handleSetAssignmentOrder = useCallback(
    ({ orderId, employeeId }) => {
      setAssignmentOrders((prevOrders) => ({
        assignmentOrders: [
          ...prevOrders.assignmentOrders,
          { orderId, employeeId },
        ],
      }));
    },
    [setAssignmentOrders]
  );

  const handleChange = (ev) => {
    const value = ev.target.value;
    if (!Boolean(value)) {
      console.log("employees value is required in employees select");
      return;
    }

    setEmployeeValue(value);
    handleSetAssignmentOrder({ orderId: order.id, employeeId: value });
  };

  const orderDate = formatDate(order.orderDate);
  const statusColor = getOrderStatusColor(order.orderStatus);
  const foundedOrderIdx = assignmentOrders.findIndex(
    (o) => o.orderId === order.id
  );
  const employee = order.employee || assignmentOrders[foundedOrderIdx] || null;

  useEffect(() => {
    if (employee) {
      setEmployeeValue(employee.employeeId);
    }
  }, [employee]);

  useEffect(() => {
    if (inView) {
      if (drivers && drivers.currentPage !== drivers.totalPages) {
        handleChangeDriversLimit(driversLimit + 4);
      }
    }
  }, [inView, ref, drivers]);

  return (
    <Card>
      <CardContent
        sx={{ paddingBottom: "0.5rem", paddingTop: "1.5rem", paddingX: "1rem" }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          {order.employeeId && (
            <TextField
              label={translatedCard.driverName}
              name="driver"
              value={`${order?.employee?.firstName} ${order?.employee?.lastName}`}
              fullWidth
              size={"small"}
              disabled={order.employeeId}
            />
          )}
          <FormControl
            fullWidth
            sx={{ display: order.employeeId ? "none" : "flex" }}
          >
            <InputLabel id="driver-select-label">
              {translatedCard.driverSelect?.split(" ")[1]}
            </InputLabel>
            <Select
              labelId="driver-select-label"
              id="driver"
              value={employeeValue ? employeeValue : "default"}
              onChange={handleChange}
              label="driver"
              MenuProps={{
                PaperProps: {
                  sx: {
                    maxHeight: 220,
                  },
                },
              }}
            >
              <MenuItem value={"default"}>
                {t(tokens.orderSchedule.card.driverSelect)}
              </MenuItem>
              {drivers?.paginatedList?.map(function (driver, idx) {
                return (
                  <MenuItem
                    key={driver.id}
                    value={driver.id}
                    ref={idx === drivers.paginatedList.length - 1 ? ref : null}
                  >{`${driver.firstName} ${driver.lastName}`}</MenuItem>
                );
              })}
              <Box
                sx={{
                  display: isGettingDriversUsers ? "flex" : "none",
                  pt: 2,
                  pb: 1,
                  px: 2,
                }}
              >
                <LinearProgress />
              </Box>
            </Select>
          </FormControl>
          <Paper
            sx={{
              width: "15px",
              height: "15px",
              borderRadius: "50%",
              backgroundColor:
                employeeValue || order.employeeId ? "#40A578" : "#FC4100",
              flexShrink: 0,
            }}
          ></Paper>
        </Box>
        <Stack width={"100%"} marginTop={4}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "1.5rem",
            }}
          >
            <Typography variant="overline">
              {translatedCard.orderId} :
            </Typography>
            <Typography variant="caption" color={"#b7b7b7"}>
              {`# ${order.id}`}{" "}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "1.5rem",
            }}
          >
            <Typography variant="overline">
              {translatedCard.customer} :
            </Typography>
            <Typography
              variant="caption"
              color={"#b7b7b7"}
            >{`${order.customer.firstName} ${order.customer.firstName}`}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "1.5rem",
            }}
          >
            <Typography variant="overline">{translatedCard.date} :</Typography>
            <Typography variant="caption" color={"#b7b7b7"}>
              {orderDate}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "1.5rem",
            }}
          >
            <Typography variant="overline">
              {translatedCard.deliveryType} :
            </Typography>
            <Typography variant="caption" color={"#b7b7b7"}>
              {order.deliveryType}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "1.5rem",
            }}
          >
            <Typography variant="overline">
              {translatedCard.orderStatus} :
            </Typography>
            <Paper
              sx={{
                width: "fit-content",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingX: "1rem",
                paddingY: "0.5rem",
                borderRadius: "50px",
                backgroundColor: statusColor,
                color: "#111",
                marginInlineStart: "auto",
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  lineHeight: "0.5rem",
                }}
              >
                {
                  filters[
                    ORDER_STATUS.get(order.orderStatus)
                      .toLowerCase()
                      .replace(" ", "")
                  ]
                }
              </Typography>
            </Paper>
          </Box>
        </Stack>
      </CardContent>
      <Stack>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography variant="overline">
              {translatedCard.customerInfo.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: "1.5rem",
              }}
            >
              <Typography variant="caption">
                {translatedCard.customerInfo.id} :
              </Typography>
              <Typography
                variant="caption"
                color={"#b7b7b7"}
                title={order.customer.id}
                sx={{
                  textOverflow: "ellipsis",
                  textWrap: "nowrap",
                  overflow: "hidden",
                }}
              >
                {order.customer.id}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: "1.5rem",
              }}
            >
              <Typography variant="caption">
                {translatedCard.customerInfo.name} :
              </Typography>
              <Typography
                variant="caption"
                color={"#b7b7b7"}
              >{`${order.customer.firstName} ${order.customer.firstName}`}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: "1.5rem",
              }}
            >
              <Typography variant="caption">
                {translatedCard.customerInfo.email} :
              </Typography>
              <Typography variant="caption" color={"#b7b7b7"}>
                {order.customer.email}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: "1.5rem",
              }}
            >
              <Typography variant="caption">
                {translatedCard.customerInfo.address} :
              </Typography>
              <Typography variant="caption" color={"#b7b7b7"}>
                {order?.customer?.location || "NA"}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: "1.5rem",
              }}
            >
              <Typography variant="caption">
                {translatedCard.customerInfo.phone} :
              </Typography>
              <Typography variant="caption" color={"#b7b7b7"}>
                {order.customer.phoneNumber}
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography variant="overline">
              {translatedCard.orderItems.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {order.orderItems.map((order, idx) => {
              const total = formatCurrency(
                order.product.price * order.quantity || 0
              );
              return (
                <Stack
                  key={idx}
                  sx={{
                    border: "2px solid ",
                    borderColor: "transparent",
                    borderLeftColor: "text.secondary",
                    marginBlockEnd: "1rem",
                    paddingInlineStart: "0.5rem",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      gap: "1.5rem",
                    }}
                  >
                    <Typography variant="caption">
                      {translatedCard.orderItems.name} :
                    </Typography>
                    <Typography variant="caption" color={"#b7b7b7"}>
                      {order.product.name}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      gap: "1.5rem",
                    }}
                  >
                    <Typography variant="caption">
                      {translatedCard.orderItems.quantity} :
                    </Typography>
                    <Typography variant="caption" color={"#b7b7b7"}>
                      {`X${order.product.quantity}`}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      gap: "1.5rem",
                    }}
                  >
                    <Typography variant="caption">
                      {translatedCard.orderItems.total} :
                    </Typography>
                    <Typography variant="caption" color={"#b7b7b7"}>
                      {total}
                    </Typography>
                  </Box>
                  <Divider />
                </Stack>
              );
            })}
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography variant="overline">
              {translatedCard.locationInfo.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: "1.5rem",
              }}
            >
              <Typography variant="caption">
                {translatedCard.locationInfo.country} :
              </Typography>
              <Typography
                variant="caption"
                color={"#b7b7b7"}
                title={order.address.country}
                sx={{
                  textOverflow: "ellipsis",
                  textWrap: "nowrap",
                  overflow: "hidden",
                }}
              >
                {order.address.country}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: "1.5rem",
              }}
            >
              <Typography variant="caption">
                {translatedCard.locationInfo.city} :
              </Typography>
              <Typography
                variant="caption"
                color={"#b7b7b7"}
                title={order.address.city}
                sx={{
                  textOverflow: "ellipsis",
                  textWrap: "nowrap",
                  overflow: "hidden",
                }}
              >
                {order.address.city}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: "1.5rem",
              }}
            >
              <Typography variant="caption">
                {translatedCard.locationInfo.zipCode} :
              </Typography>
              <Typography
                variant="caption"
                color={"#b7b7b7"}
                title={order.address.postalCode}
                sx={{
                  textOverflow: "ellipsis",
                  textWrap: "nowrap",
                  overflow: "hidden",
                }}
              >
                {order.address.postalCode}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: "1.5rem",
              }}
            >
              <Typography variant="caption">
                {translatedCard.locationInfo.address} :
              </Typography>
              <Typography
                variant="caption"
                color={"#b7b7b7"}
                title={order.address.postalCode}
                sx={{
                  overflow: "hidden",
                }}
              >
                {`${order.address.adressLine2} ${order.address.adressLine1} - ${order.address.city}, ${order.address.country} ${order.address.postalCode}`}
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Stack>
    </Card>
  );
};

export default OrderScheduleCard;
