import { useMemo } from "react";
import PropTypes from "prop-types";
import { Alert, Snackbar, TablePagination } from "@mui/material";
import { Scrollbar } from "../../../components/scrollbar";
import CollapsibleTable from "./product-table/collabseable-table";
import CustomRow from "./product-table/custom-row";
import { createData } from "./product-table/create-data";

import useSnackbar from "../../../hooks/use-snackbar";

export const ProductListTable = (props) => {
  const {
    onPageChange,
    onRowsPerPageChange,
    page,
    products,
    productsCount,
    rowsPerPage,
    isSuccessProducts,
    totalPages,
    ...other
  } = props;
  const {
    anchorOrigin,
    handleCloseSnackbar,
    handleOpenSnackbar,
    openSnackbar,
    translatedToast,
    autoHideDuration,
  } = useSnackbar();
  const rows = useMemo(() => {
    const mappedProducts = isSuccessProducts
      ? products.map((prd, idx) =>
          createData({
            id: prd.id,
            name: prd.name,
            image: prd.imageUrl,
            description: prd.description,
            categoryName: prd?.category?.name,
            discount: prd?.discount?.discountPercentage,
            price: prd?.price,
            quantity: prd?.quantity,
            isActive: prd?.isActive,
            categoryOptions: { ...prd?.category, answers: prd?.answers },
            discountOptions: prd?.discount,
          })
        )
      : [];
    return mappedProducts;
  }, [products, isSuccessProducts]);

  return (
    <div {...other}>
      <Scrollbar>
        <CollapsibleTable>
          {isSuccessProducts &&
            rows.map((product) => (
              <CustomRow
                sx={{ width: "70%" }}
                key={product.id}
                row={product}
                handleOpenSnackbar={handleOpenSnackbar}
                translatedToast={translatedToast}
              />
            ))}
        </CollapsibleTable>
      </Scrollbar>
      <TablePagination
        component="div"
        count={productsCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
      <Snackbar
        open={openSnackbar.open}
        autoHideDuration={autoHideDuration}
        anchorOrigin={anchorOrigin}
        onClose={handleCloseSnackbar}
      >
        <Alert severity={openSnackbar.severity}>{openSnackbar.message}</Alert>
      </Snackbar>
    </div>
  );
};

ProductListTable.propTypes = {
  products: PropTypes.array.isRequired,
  isSuccessProducts: PropTypes.bool.isRequired,

  productsCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
