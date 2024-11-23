import {
  Box,
  Button,
  Card,
  CardContent,
  FormControlLabel,
  Grid,
  LinearProgress,
  Stack,
  Switch,
  TextField,
  Typography,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useFormik } from "formik";
import { useCallback, useEffect, useMemo, useState } from "react";
import * as Yup from "yup";
import dayjs from "dayjs";
import { trim } from "lodash";
import { useSearchParams } from "next/navigation";
import { paths } from "../../../paths";
import { useRouter } from "next/router";
import {
  useAddCoupon,
  useGetCouponById,
  useUpdateCoupon,
} from "../../../hooks/use-coupon";
import LoopIcon from "@mui/icons-material/Loop";
import { COUPON_TYPES, generateVoucherId } from "../../../utils/coupon-helpers";
import useTranslateCoupon from "../../../hooks/use-translate-coupon";
import useSnackbar from "../../../hooks/use-snackbar";
import { useValidationMessages } from "../../../hooks/use-validation-messages";

const initialValues = {
  name: "",
  discription: "",
  percentage: "",
  active: false,
  fromDate: new Date().toISOString().slice(0, 16),
  toDate: new Date().toISOString().slice(0, 16),
  numberOfTimes: "",
  numberUsed: "",
  maxAmount: "",
  couponType: "",
  voucherCode: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("coupon name is required field"),
  discription: Yup.string().required("description name is required field"),
  percentage: Yup.number()
    .min(
      1,
      "coupon percentage should be between 1% to 100% , it is less than 1%"
    )
    .max(
      100,
      "coupon percentage should be between 1% to 100% , it is greater than 100%"
    )
    .required("Coupon percentage is required field"),
  active: Yup.bool().required("coupon state is required field"),
  fromDate: Yup.date().required("start date is required field"),
  toDate: Yup.date().required("end date is required field "),
  numberOfTimes: Yup.number().required(
    "Coupon number of times is required field"
  ),
  numberUsed: Yup.number().required("Coupon number used is required field"),
  maxAmount: Yup.number().required(
    "Coupon max amount of times is required field"
  ),
  couponType: Yup.number().required("Coupon type of times is required field"),
  voucherCode: Yup.string().required("Voucher code is required field"),
});

const CreateCouponFrom = (...props) => {
  const { coupon: couponValidationTranslation } = useValidationMessages();

  const validationSchema = useMemo(
    () =>
      Yup.object({
        name: Yup.string().required(
          couponValidationTranslation.couponName.required
        ),
        discription: Yup.string().required(
          couponValidationTranslation.description.required
        ),
        percentage: Yup.number()
          .min(
            1,
            couponValidationTranslation.couponPercentage.between
              .replace("{start}", "1")
              .replace("{end}", "100")
          )
          .max(
            100,
            couponValidationTranslation.couponPercentage.between
              .replace("{start}", "1")
              .replace("{end}", "100")
          )
          .required(couponValidationTranslation.couponPercentage.required),
        active: Yup.bool().required("coupon state is required field"),
        fromDate: Yup.date().required(
          couponValidationTranslation.startDate.required
        ),
        toDate: Yup.date().required(
          couponValidationTranslation.endDate.required
        ),
        numberOfTimes: Yup.number().required(
          couponValidationTranslation.numberOfTimes.required
        ),
        numberUsed: Yup.number().required(
          couponValidationTranslation.numberOfUsed.required
        ),
        maxAmount: Yup.number().required(
          couponValidationTranslation.maxAmount.required
        ),
        couponType: Yup.number().required(
          couponValidationTranslation.couponTypes.required
        ),
        voucherCode: Yup.string().required(
          couponValidationTranslation.couponCode.required
        ),
      }),
    [couponValidationTranslation]
  );

  const {
    translateCoupon: { createCoupon: createCouponTranslation },
  } = useTranslateCoupon();
  const [updatable, setUpdatable] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const {
    anchorOrigin,
    handleCloseSnackbar,
    handleOpenSnackbar,
    openSnackbar,
    translatedToast,
    autoHideDuration,
  } = useSnackbar();
  const { isPendingAddCoupon, mutateAsyncAddCoupon } = useAddCoupon();
  const { updateCoupon, isPendingUpdateCoupon } = useUpdateCoupon();
  const { coupon, isLoadingCoupon } = useGetCouponById(searchParams.get("id"));

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, helpers) => handleSubmit(values, helpers),
  });

  const handleCreateNewCoupon = useCallback(
    async (couponData, helpers) => {
      try {
        await mutateAsyncAddCoupon(couponData);
        helpers.setStatus({ success: true });
        handleOpenSnackbar({
          message: translatedToast.createMsg.replace(
            "@",
            `#${couponData.name}`
          ),
          severity: "success",
        });
        formik.resetForm();
      } catch (err) {
        console.error(err);
        handleOpenSnackbar({
          message: translatedToast.errorMsg,
          severity: "error",
        });
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
    [mutateAsyncAddCoupon, handleOpenSnackbar, translatedToast, formik]
  );
  const handleUpdateCoupon = useCallback(
    async (couponData, helpers) => {
      try {
        const couponId = searchParams.get("id");

        await updateCoupon({
          couponId,
          newCouponData: { id: couponId, ...couponData },
        });
        formik.resetForm();
        helpers.setStatus({ success: true });
        handleOpenSnackbar({
          message: translatedToast.updateMsg.replace(
            "@",
            `#${couponData.name}`
          ),
          severity: "success",
        });
      } catch (err) {
        console.error(err);
        handleOpenSnackbar({
          message: translatedToast.errorMsg,
          severity: "error",
        });
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
    [updateCoupon, handleOpenSnackbar, translatedToast, searchParams, formik]
  );
  const handleGenerateVoucher = useCallback(() => {
    formik.setFieldValue(
      "voucherCode",
      generateVoucherId(8).toLocaleUpperCase()
    );
  }, [formik]);

  const handleSubmit = useCallback(
    async (values, helpers) => {
      try {
        const couponData = {
          name: trim(values.name),
          discription: trim(values.discription),
          percentage: values.percentage,
          active: Boolean(values.active),
          fromDate: dayjs(values.fromDate).toISOString(),
          toDate: dayjs(values.toDate).toISOString(),
          numberOfTimes: values.numberOfTimes,
          numberUsed: values.numberUsed,
          maxAmount: values.maxAmount,
          voucherId: trim(values.voucherCode),
          couponType: values.couponType,
        };

        if (updatable) {
          handleUpdateCoupon(couponData, helpers);
        } else {
          handleCreateNewCoupon(couponData, helpers);
        }
        router.push(paths.dashboard.offers.couponList);
      } catch (error) {
        console.error(first);
      }
    },
    [updatable, router, handleUpdateCoupon, handleCreateNewCoupon]
  );

  useEffect(() => {
    if (coupon && searchParams.get("update") === "1") {
      formik.setValues({
        name: coupon.name,
        discription: coupon.discription,
        percentage: coupon.percentage,
        active: coupon.active,
        fromDate: coupon.fromDate?.slice(0, 16),
        toDate: coupon.toDate?.slice(0, 16),
        numberOfTimes: coupon.numberOfTimes,
        numberUsed: coupon.numberUsed,
        maxAmount: coupon.maxAmount,
        couponType: coupon.couponType,
        voucherCode: trim(coupon.voucherId),
      });
      setUpdatable(true);
    } else {
      setUpdatable(false);
      formik.resetForm();
    }
  }, [coupon, searchParams]);

  return (
    <>
      {isLoadingCoupon && <LinearProgress />}
      <form onSubmit={formik.handleSubmit} {...props}>
        <Stack spacing={4}>
          <Card>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
                    {createCouponTranslation.form.title}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Stack spacing={3}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "1rem",
                      }}
                    >
                      <TextField
                        error={
                          !!(
                            formik.touched.voucherCode &&
                            formik.errors.voucherCode
                          )
                        }
                        fullWidth
                        helperText={
                          formik.touched.voucherCode &&
                          formik.errors.voucherCode
                        }
                        label={createCouponTranslation.form.inputs.voucherCode}
                        name="voucherCode"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.voucherCode}
                      />
                      <Button
                        endIcon={<LoopIcon />}
                        sx={{ flexShrink: 0 }}
                        variant="contained"
                        onClick={handleGenerateVoucher}
                      >
                        {createCouponTranslation.form.inputs.generateCodeBtn}
                      </Button>
                    </Box>
                    <TextField
                      error={!!(formik.touched.name && formik.errors.name)}
                      fullWidth
                      helperText={formik.touched.name && formik.errors.name}
                      label={createCouponTranslation.form.inputs.couponName}
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
                      label={createCouponTranslation.form.inputs.description}
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
                        label={createCouponTranslation.form.inputs.startDate}
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
                        label={createCouponTranslation.form.inputs.endDate}
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
                          name="active"
                        />
                      }
                      label={createCouponTranslation.form.inputs.active}
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
                            formik.touched.numberOfTimes &&
                            formik.errors.numberOfTimes
                          )
                        }
                        fullWidth
                        helperText={
                          formik.touched.numberOfTimes &&
                          formik.errors.numberOfTimes
                        }
                        label={
                          createCouponTranslation.form.inputs.numberOfTimes
                        }
                        name="numberOfTimes"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.numberOfTimes}
                        type="number"
                      />
                      <TextField
                        error={
                          !!(
                            formik.touched.numberUsed &&
                            formik.errors.numberUsed
                          )
                        }
                        fullWidth
                        helperText={
                          formik.touched.numberUsed && formik.errors.numberUsed
                        }
                        label={createCouponTranslation.form.inputs.numberOfUsed}
                        name="numberUsed"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.numberUsed}
                        type="number"
                      />
                    </Box>
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
                            formik.touched.maxAmount && formik.errors.maxAmount
                          )
                        }
                        fullWidth
                        helperText={
                          formik.touched.maxAmount && formik.errors.maxAmount
                        }
                        label={createCouponTranslation.form.inputs.maxAmount}
                        name="maxAmount"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.maxAmount}
                        type="number"
                      />
                      <TextField
                        error={
                          !!(
                            formik.touched.percentage &&
                            formik.errors.percentage
                          )
                        }
                        fullWidth
                        helperText={
                          formik.touched.percentage && formik.errors.percentage
                        }
                        label={
                          createCouponTranslation.form.inputs.couponPercentage
                        }
                        name="percentage"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.percentage}
                        type="number"
                      />
                      <TextField
                        error={
                          !!(
                            formik.touched.couponType &&
                            formik.errors.couponType
                          )
                        }
                        fullWidth
                        helperText={
                          formik.touched.couponType && formik.errors.couponType
                        }
                        label={createCouponTranslation.form.inputs.couponType}
                        name="couponType"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.couponType}
                        select
                      >
                        {Array.from(COUPON_TYPES).map(([value, label], idx) => (
                          <MenuItem key={idx} value={value}>
                            {label}
                          </MenuItem>
                        ))}
                      </TextField>
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
            <Button color="inherit" sx={{ width: "25%" }}>
              {createCouponTranslation.actions.cancel}
            </Button>
            <LoadingButton
              type="submit"
              variant="contained"
              sx={{ width: "25%" }}
              loading={isPendingAddCoupon || isPendingUpdateCoupon}
            >
              {updatable
                ? createCouponTranslation.actions.update
                : createCouponTranslation.actions.create}
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
};

export default CreateCouponFrom;
