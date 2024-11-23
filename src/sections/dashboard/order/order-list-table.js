import PropTypes from "prop-types";
import { format } from "date-fns";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import NextLink from "next/link";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  ORDER_STATUS,
  getOrderStatusColor,
} from "../../../utils/orders-helpers";
import { paths } from "../../../paths";
import useTranslateOrders from "../../../hooks/use-translate-orders";

const statusMap = {
  complete: "success",
  pending: "info",
  canceled: "warning",
  rejected: "error",
};

export const OrderListTable = (props) => {
  const { translatedOrders } = useTranslateOrders();
  const [, translation] = useTranslation();

  {
    const [_, translation] = useTranslation();
    const {
      onOrderSelect,
      onPageChange,
      onRowsPerPageChange,
      orders,
      ordersCount,
      page,
      rowsPerPage,
      ...other
    } = props;

    return (
      <div {...other}>
        <Table>
          <TableBody>
            {orders?.map((order) => {
              const createdAtMonth = format(
                new Date(order.orderDate),
                "LLL"
              ).toUpperCase();
              const createdAtDay = format(new Date(order.orderDate), "d");
              const totalAmount = Intl.NumberFormat(
                `${translation.language}-SA`,
                { style: "currency", currency: "SAR" }
              ).format(order.total || 0);
              const statusColor = getOrderStatusColor(order.orderStatus);

              return (
                <TableRow hover key={order.id} sx={{ cursor: "pointer" }}>
                  <TableCell
                    sx={{
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <Box
                      onClick={() => onOrderSelect?.(order.id)}
                      sx={{
                        backgroundColor: (theme) =>
                          theme.palette.mode === "dark"
                            ? "neutral.800"
                            : "neutral.200",
                        borderRadius: 2,
                        maxWidth: "fit-content",
                        ml: 3,
                        p: 1,
                      }}
                    >
                      <Typography align="center" variant="subtitle2">
                        {createdAtMonth}
                      </Typography>
                      <Typography align="center" variant="h6">
                        {createdAtDay}
                      </Typography>
                    </Box>
                    <Box
                      onClick={() => onOrderSelect?.(order.id)}
                      sx={{ ml: 2 }}
                    >
                      <Typography variant="subtitle2">#{order.id}</Typography>
                      <Typography color="text.secondary" variant="body2">
                        {translatedOrders.ordersTable.totalOf} {totalAmount}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell
                    onClick={() => onOrderSelect?.(order.id)}
                    align="right"
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
                      <Typography
                        variant="subtitle1"
                        sx={{
                          overflow: "hidden",
                          lineHeight: "1.5rem",
                          textOverflow: "ellipsis",
                          textWrap: "nowrap",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {
                          translatedOrders.filters[
                            ORDER_STATUS.get(order.orderStatus)
                              .toLowerCase()
                              .replace(" ", "")
                          ]
                        }
                      </Typography>
                    </Paper>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      LinkComponent={NextLink}
                      href={paths.dashboard.orders.details.replace(
                        ":orderId",
                        order.id
                      )}
                      endIcon={
                        <ArrowForwardIcon
                          sx={{
                            rotate:
                              translation.language === "en" ? "0deg" : "180deg",
                          }}
                        />
                      }
                    >
                      {translatedOrders.ordersTable.goToBtn}
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={ordersCount}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </div>
    );
  }
};

OrderListTable.propTypes = {
  onOrderSelect: PropTypes.func,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  orders: PropTypes.array.isRequired,
  ordersCount: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
