import { Fragment, useCallback } from "react";
import {
  Alert,
  LinearProgress,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "../../../components/scrollbar";
import { SeverityPill } from "../../../components/severity-pill";
import { LoadingButton } from "@mui/lab";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { paths } from "../../../paths";
import usePagination from "../../../hooks/use-pagination";
import {
  useDeleteDiscount,
  useGetDiscounts,
} from "../../../hooks/use-discount";
import useTranslateDiscounts from "../../../hooks/use-translate-discounts";
import useDateFormat from "../../../hooks/use-date.format";
import useSnackbar from "../../../hooks/use-snackbar";
import Dialog from "../../../components/dialog/Dialog";
import useTranslateNetworkMessages from "../../../hooks/use-translate-network-msgs.js";

const DiscountsListTable = (props) => {
  const { translateDiscounts } = useTranslateDiscounts();
  const { noFoundResources, currentLang } = useTranslateNetworkMessages();

  const { handleChangeLimit, handleChangePage, limit, page } = usePagination({
    limit: 10,
    page: 1,
  });
  const {
    discounts,
    discountsCount,
    isSuccessDiscounts,
    isPendingDiscounts,
    isErrorDiscounts,
    discountsError,
  } = useGetDiscounts({
    sortOrder: "isUsed",
    orderDirection: "desc",
    limit,
    page,
  });
  const {
    anchorOrigin,
    handleCloseSnackbar,
    handleOpenSnackbar,
    openSnackbar,
    translatedToast,
    autoHideDuration,
  } = useSnackbar();
  const router = useRouter();
  const { deleteDiscount, isPendingDeleteDiscount } = useDeleteDiscount();
  const { formatDate } = useDateFormat();

  const onPageChange = useCallback(
    (_ev, page) => {
      if (page < 1) return;

      handleChangePage(page);
    },
    [handleChangePage]
  );
  const onRowsPerPageChange = useCallback(
    (event) => {
      const rows = parseInt(event.target.value, 10);
      handleChangeLimit(rows);
    },
    [handleChangeLimit]
  );

  const handleDeleteDiscount = async (discount) => {
    try {
      const toastId = "discount-dialog";
      toast.custom(
        (t) => (
          <Dialog
            onReject={() => toast.remove(toastId)}
            onAccept={async () => {
              await deleteDiscount(discount.id);
              handleOpenSnackbar({
                message: translatedToast.deleteMsg.replace(
                  "@",
                  `#${discount.name}`
                ),
                severity: "success",
              });
              toast.remove(toastId);
            }}
          />
        ),
        { position: "top-center", duration: 1000 * 10, id: toastId }
      );
    } catch (error) {
      handleOpenSnackbar({
        message: translatedToast.errorMsg,
        severity: "error",
      });
      console.error(error);
    }
  };

  const handleUpdateDiscount = async (discount) => {
    try {
      router.push(
        `${paths.dashboard.offers.createDiscount}?id=${discount.id}&update=1`
      );
    } catch (error) {
      toast.error("something went wrong");
      console.error(error);
    }
  };

  return (
    <>
      {isPendingDiscounts && <LinearProgress />}
      <div {...props}>
        <Scrollbar>
          <Table sx={{ minWidth: 1200, marginTop: "1.5rem" }}>
            <TableHead>
              <TableRow>
                <TableCell width="15%">
                  {translateDiscounts.discountTable.columns.name}
                </TableCell>
                <TableCell width="5%">
                  {translateDiscounts.discountTable.columns.status}
                </TableCell>
                <TableCell width={"10%"}>
                  {translateDiscounts.discountTable.columns.discount}
                </TableCell>
                <TableCell width={"20%"}>
                  {translateDiscounts.discountTable.columns.description}
                </TableCell>
                <TableCell width={"15%"}>
                  {translateDiscounts.discountTable.columns.startDate}
                </TableCell>
                <TableCell width={"15%"}>
                  {translateDiscounts.discountTable.columns.endDate}
                </TableCell>
                <TableCell align="right">
                  {translateDiscounts.discountTable.columns.actions}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isSuccessDiscounts &&
                discounts.paginatedList.map((discount) => {
                  // const quantityColor = discount.quantity >= 10 ? 'success' : 'error';
                  // const statusColor = discount.status === 'published' ? 'success' : 'info';
                  const statusColor = discount.active ? "success" : "error";
                  // const hasManyVariants = discount.variants > 1;
                  const hasManyVariants = true;

                  return (
                    <Fragment key={discount.id}>
                      <TableRow hover key={discount.id}>
                        <TableCell width="15%">
                          <Typography variant="subtitle2">
                            {discount.name}
                          </Typography>
                        </TableCell>
                        <TableCell width="5%">
                          <SeverityPill color={statusColor}>
                            {discount.active
                              ? translateDiscounts.discountTable.columns.active
                              : translateDiscounts.discountTable.columns
                                  .inActive}
                          </SeverityPill>
                        </TableCell>
                        <TableCell width={"10%"}>
                          <Typography variant="subtitle1">
                            {`${discount.discountPercentage}%`}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2">
                            {discount.discription}
                          </Typography>
                        </TableCell>
                        <TableCell width={"15%"}>
                          <Typography variant="subtitle2">
                            {formatDate(discount.fromDate)}
                          </Typography>
                        </TableCell>
                        <TableCell width={"15%"}>
                          <Typography variant="subtitle2">
                            {formatDate(discount.toDate)}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <LoadingButton
                            size="small"
                            onClick={() => handleUpdateDiscount(discount)}
                          >
                            <EditIcon />
                          </LoadingButton>
                          {!discount.isUsed && (
                            <LoadingButton
                              size="small"
                              color="error"
                              onClick={() => handleDeleteDiscount(discount)}
                            >
                              <DeleteForeverIcon />
                            </LoadingButton>
                          )}
                        </TableCell>
                      </TableRow>
                    </Fragment>
                  );
                })}

              {!isPendingDiscounts && isErrorDiscounts && (
                <TableRow>
                  <TableCell width="15%"></TableCell>
                  <TableCell width="5%"></TableCell>
                  <TableCell width={"10%"}></TableCell>
                  <TableCell>
                    {noFoundResources.title.replace(
                      "{resourceName}",
                      currentLang === "ar" ? "خصومات" : "discounts"
                    )}
                  </TableCell>
                  <TableCell width={"15%"}></TableCell>
                  <TableCell width={"15%"}></TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Scrollbar>
        <TablePagination
          component="div"
          count={discounts?.paginatedList.length || 0}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </div>
      <Snackbar
        open={openSnackbar.open}
        autoHideDuration={autoHideDuration}
        anchorOrigin={anchorOrigin}
        onClose={handleCloseSnackbar}
      >
        <Alert severity={openSnackbar.severity}>{openSnackbar.message}</Alert>
      </Snackbar>
    </>
  );
};

export default DiscountsListTable;
