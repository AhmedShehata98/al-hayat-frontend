import PropTypes from "prop-types";
import {
  Box,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "../../../components/scrollbar";
import { useTranslation } from "react-i18next";
import useTranslateOrders from "../../../hooks/use-translate-orders";

export const OrderItems = (props) => {
  const {
    translatedOrders: { detailsPage: detailsPageTranslation },
  } = useTranslateOrders();
  const { items, ...other } = props;
  const [_, translation] = useTranslation();

  return (
    <Card {...other}>
      <CardHeader title={detailsPageTranslation.orderItems.title} />
      <Scrollbar>
        <Box sx={{ minWidth: 700 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  {detailsPageTranslation.orderItems.description}
                </TableCell>
                <TableCell>
                  {detailsPageTranslation.orderItems.billingCycle}
                </TableCell>
                <TableCell>
                  {detailsPageTranslation.orderItems.amount}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => {
                const title = `${item.product.name} x ${item.quantity}`;
                const unitAmount = Intl.NumberFormat(
                  `${translation.language}-SA`,
                  { currency: "SAR", style: "currency" }
                ).format(item.product.price * item.quantity || 0);
                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Typography variant="subtitle2">{title}</Typography>
                    </TableCell>
                    <TableCell>{item.billingCycle}</TableCell>
                    <TableCell>{unitAmount}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={items.length}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
        page={0}
        rowsPerPage={5}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

OrderItems.propTypes = {
  items: PropTypes.array.isRequired,
};
