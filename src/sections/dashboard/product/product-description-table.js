import {
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { productsApi } from "../../../api/products";

const useGetProductDescriptionQuery = () => {
  const {
    data: productDescription,
    isSuccess: isProductDescriptionSuccess,
    isLoading: isProductDescriptionLoading,
  } = useQuery({
    queryKey: ["product-description"],
    queryFn: () => productsApi.getAllProductDescription(),
  });

  return {
    productDescription: productDescription?.contentList?.[0],
    isProductDescriptionSuccess,
    isProductDescriptionLoading,
  };
};

const ProductDescriptionTable = () => {
  const {
    productDescription,
    isProductDescriptionLoading,
    isProductDescriptionSuccess,
  } = useGetProductDescriptionQuery();

  return (
    <>
      {isProductDescriptionLoading && <LinearProgress />}
      <Paper style={{ height: 400, width: "100%" }}>
        <TableContainer sx={{ maxHeight: 450 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Manufacturing number</TableCell>
                <TableCell>trademark</TableCell>
                <TableCell>type</TableCell>
                <TableCell>size</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isProductDescriptionSuccess &&
                productDescription.map((prdDescription, idx) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={idx}>
                    <TableCell>{prdDescription.manifactringNumber}</TableCell>
                    <TableCell>{prdDescription.trademark}</TableCell>
                    <TableCell>{prdDescription.type}</TableCell>
                    <TableCell>{prdDescription.size}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default ProductDescriptionTable;
