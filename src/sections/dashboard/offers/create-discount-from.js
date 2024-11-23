import { useFormik } from "formik";
import { paths } from "../../../paths";
import * as Yup from "yup";
import dayjs from "dayjs";
import {
  Alert,
  Box,
  Card,
  CardContent,
  FormControlLabel,
  Grid,
  LinearProgress,
  Snackbar,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import toast from "react-hot-toast";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  useAddDiscount,
  useGetDiscountsById,
  useUpdateDiscount,
} from "../../../hooks/use-discount";
import { useRouter } from "next/router";
import useTranslateDiscounts from "../../../hooks/use-translate-discounts";
import useSnackbar from "../../../hooks/use-snackbar";
import { useValidationMessages } from "../../../hooks/use-validation-messages";

const initialValues = {
  name: "",
  discription: "",
  discountPercentage: "",
  active: false,
  fromDate: new Date().toISOString().slice(0, 16),
  toDate: new Date().toISOString().slice(0, 16),
};

export default function DiscountCreateForm(props) {
  const {
    translateDiscounts: { discountCreate },
  } = useTranslateDiscounts();
  const { discount: discountValidationTranslation } = useValidationMessages();
  const validationSchema = useMemo(
    () =>
      Yup.object({
        name: Yup.string().required(
          discountValidationTranslation.discountName.required
        ),
        discription: Yup.string().required(
          discountValidationTranslation.description.required
        ),
        discountPercentage: Yup.number()
          .min(
            1,
            discountValidationTranslation.discountPercentage.between
              .replace("{start}", "1")
              .replace("{end}", "100")
          )
          .max(
            100,
            discountValidationTranslation.discountPercentage.between
              .replace("{start}", "1")
              .replace("{end}", "100")
          )
          .required(discountValidationTranslation.discountPercentage.required),
        active: Yup.boolean().required("discount state is required"),
        fromDate: Yup.string().required(
          discountValidationTranslation.startDate.required
        ),
        toDate: Yup.string().required(
          discountValidationTranslation.endDate.required
        ),
      }),
    [discountValidationTranslation]
  );

  const [updatable, setUpdatable] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addDiscount, isPendingAddDiscount } = useAddDiscount();
  const { updateDiscount, isPendingUpdateDiscount } = useUpdateDiscount();
  const { discount, isGettingDiscount } = useGetDiscountsById(
    searchParams.get("id")
  );
  const {
    anchorOrigin,
    handleCloseSnackbar,
    handleOpenSnackbar,
    openSnackbar,
    translatedToast,
    autoHideDuration,
  } = useSnackbar();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, helpers) => submitHandler(values, helpers),
  });
  const handleCreateCoupon = useCallback(
    async (discountData, helpers) => {
      try {
        await addDiscount(discountData);
        handleOpenSnackbar({
          message: translatedToast.createMsg.replace(
            "@",
            `#${discountData.name}`
          ),
          severity: "success",
        });
      } catch (error) {
        console.error(error);
        handleOpenSnackbar({
          message: translatedToast.errorMsg,
          severity: "error",
        });
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: error.message });
        helpers.setSubmitting(false);
      }
    },
    [addDiscount, handleOpenSnackbar, translatedToast]
  );

  const handleUpdateCoupon = useCallback(
    async (newDiscountData, helpers) => {
      const discountId = searchParams.get("id");

      try {
        await updateDiscount({
          discountId,
          newDiscountData: { id: discountId, ...newDiscountData },
        });
        handleOpenSnackbar({
          message: translatedToast.updateMsg.replace(
            "@",
            `#${newDiscountData.name}`
          ),
          severity: "success",
        });
      } catch (error) {
        console.error(error);
        handleOpenSnackbar({
          message: translatedToast.errorMsg,
          severity: "error",
        });
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: error.message });
        helpers.setSubmitting(false);
      }
    },
    [updateDiscount, handleOpenSnackbar, translatedToast, searchParams]
  );

  const submitHandler = useCallback(
    async (values, helpers) => {
      const discountData = {
        ...values,
        fromDate: dayjs(values.fromDate),
        toDate: dayjs(values.toDate),
      };

      try {
        if (updatable) {
          await handleUpdateCoupon(discountData, helpers);
        } else {
          await handleCreateCoupon(discountData, helpers);
        }
        router.push(paths.dashboard.offers.discountList);
        formik.resetForm();
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong!");
      }
    },
    [updatable, formik, handleCreateCoupon, handleUpdateCoupon]
  );

  useEffect(() => {
    if (discount && searchParams.get("update") === "1") {
      formik.setValues({
        name: discount.name,
        discription: discount.discription,
        discountPercentage: discount.discountPercentage,
        active: discount.active,
        fromDate: dayjs(discount.fromDate).toISOString().slice(0, 16),
        toDate: dayjs(discount.toDate).toISOString().slice(0, 16),
      });

      setUpdatable(true);
    } else {
      setUpdatable(false);
      formik.resetForm();
    }
  }, [discount, searchParams]);

  return (
    <>
      {/* Loading fetching discounts */}
      {isGettingDiscount && <LinearProgress />}
      {/* End Loading fetching discounts */}
      <form onSubmit={formik.handleSubmit} {...props}>
        <Stack spacing={4}>
          <Card>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
                    {discountCreate.headingTitle}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Stack spacing={3}>
                    <TextField
                      error={!!(formik.touched.name && formik.errors.name)}
                      fullWidth
                      helperText={formik.touched.name && formik.errors.name}
                      label={discountCreate.form.inputs.name}
                      name="name"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.name}
                    />
                    <TextField
                      error={
                        !!(
                          formik.touched.discription &&
                          formik.errors.discription
                        )
                      }
                      fullWidth
                      helperText={
                        formik.touched.discription && formik.errors.discription
                      }
                      label={discountCreate.form.inputs.description}
                      name="discription"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.discription}
                    />

                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        gap: "1rem",
                        alignItems: "center",
                      }}
                    >
                      <TextField
                        error={
                          !!(formik.touched.fromDate && formik.errors.fromDate)
                        }
                        fullWidth
                        type={"datetime-local"}
                        helperText={
                          formik.touched.fromDate && formik.errors.fromDate
                        }
                        label={discountCreate.form.inputs.startDate}
                        name="fromDate"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.fromDate}
                      />
                      <Typography variant="subtitle1"> - </Typography>
                      <TextField
                        error={
                          !!(formik.touched.toDate && formik.errors.toDate)
                        }
                        fullWidth
                        type={"datetime-local"}
                        helperText={
                          formik.touched.toDate && formik.errors.toDate
                        }
                        label={discountCreate.form.inputs.endDate}
                        name="toDate"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.toDate}
                      />
                    </Box>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formik.values.active}
                          onChange={formik.handleChange}
                          name={"active"}
                        />
                      }
                      label={discountCreate.form.inputs.active}
                    />
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        gap: "1rem",
                        alignItems: "center",
                      }}
                    >
                      <TextField
                        error={
                          !!(
                            formik.touched.discountPercentage &&
                            formik.errors.discountPercentage
                          )
                        }
                        fullWidth
                        helperText={
                          formik.touched.discountPercentage &&
                          formik.errors.discountPercentage
                        }
                        label={discountCreate.form.inputs.discount}
                        name="discountPercentage"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.discountPercentage}
                        type="number"
                      />
                    </Box>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="flex-end"
            spacing={1}
          >
            <LoadingButton color="inherit" sx={{ width: "25%" }}>
              {discountCreate.actions.cancel}
            </LoadingButton>
            <LoadingButton
              type="submit"
              variant="contained"
              sx={{ width: "25%" }}
              loading={isPendingAddDiscount || isPendingUpdateDiscount}
            >
              {updatable
                ? discountCreate.actions.update
                : discountCreate.actions.create}
            </LoadingButton>
          </Stack>
        </Stack>
      </form>
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
}
