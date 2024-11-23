import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import useTranslateProducts from "../../../../hooks/use-translate-products";

export default function CollapsibleTable(props) {
  const { children } = props;
  const {
    translateProducts: {
      productsTable: {
        mainTable: { columns },
      },
    },
  } = useTranslateProducts();
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" sx={{ minWidth: 1200 }}>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>#</TableCell>
            <TableCell>{columns.name}</TableCell>
            <TableCell>{columns.productImage}</TableCell>
            <TableCell>{columns.description}</TableCell>
            <TableCell>{columns.categoryName}</TableCell>
            <TableCell align="right">{columns.discount.title}</TableCell>
            <TableCell align="right">{columns.price}</TableCell>
            <TableCell align="right">{columns.quantity}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
}
