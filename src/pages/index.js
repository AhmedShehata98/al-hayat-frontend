import Head from "next/head";
import { usePageView } from "../hooks/use-page-view";
import * as Yup from "yup";
import { useFormik } from "formik";
import { MuiOtpInput } from "mui-one-time-password-input";
import {
  Alert,
  Box,
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { paths } from "../paths";
import { Layout as AuthLayout } from "../layouts/auth/modern-layout";
import { LoadingButton } from "@mui/lab";
import { useGetGenerateOtp, useValidateOtp } from "../hooks/use-auth";
import { authService } from "../api/auth";
import { useCallback, useMemo } from "react";
import { useMounted } from "../hooks/use-mounted";
import { useRouter } from "next/router";
import useTranslateLogin from "../hooks/use-translate-login";
import useAppSettings from "../hooks/use-app-settings";
import useSnackbar from "../hooks/use-snackbar";
import { useValidationMessages } from "../hooks/use-validation-messages";
const initialValues = {
  phoneNumber: "",
  otp: "",
  // policy: false,
  submit: null,
};

const Page = () => {
  const isMounted = useMounted();
  const router = useRouter();
  const { settings } = useAppSettings();
  const { login: loginValidationTranslation } = useValidationMessages();
  const validationSchema = useMemo(
    () =>
      Yup.object({
        phoneNumber: Yup.string()
          // .matches(/^\+966/, "Phone Number should start with +966 saudi code")
          .required(loginValidationTranslation.phoneNumber.required)
          .min(
            9,
            loginValidationTranslation.phoneNumber.minLength.replace(
              "{minLength}",
              "9"
            )
          )
          .max(
            9,
            loginValidationTranslation.phoneNumber.maxLength.replace(
              "{maxLength}",
              "9"
            )
          ),
        // policy: Yup.boolean().oneOf([true], "This field must be checked"),

        otp: Yup.number().required(loginValidationTranslation.otp.required),
      }),
    [loginValidationTranslation]
  );

  const {
    anchorOrigin,
    autoHideDuration,
    handleCloseSnackbar,
    handleOpenSnackbar,
    openSnackbar,
    translatedToast,
  } = useSnackbar();
  const {
    agreeCheckbox,
    code: codeHeading,
    continueBtn,
    logo,
    LoginHeadingTitle,
    phoneNumberInput,
    sendCodeBtn,
    sendOtpBtnAgain,
    options: translationOptions,
  } = useTranslateLogin();
  const { generateOtpCode, isPendingGenerateOtp, isSuccessGenerateOtp } =
    useGetGenerateOtp();
  const { validateOtpCode, isSuccessValidateOtp, isPendingValidateOtp } =
    useValidateOtp();
  usePageView();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, helpers) => login(values, helpers),
  });

  const sendOTP = useCallback(async () => {
    try {
      const data = await generateOtpCode(`+966${formik.values.phoneNumber}`);
      const otp = data?.contentList?.[0].otpToken;

      if (authService.isDevelopmentEnvironment) {
        formik.setFieldValue("otp", otp);
      }
      handleOpenSnackbar({
        open: true,
        severity: "success",
        message: translatedToast.otpSend,
      });
    } catch (error) {
      handleOpenSnackbar({
        open: true,
        severity: "error",
        message: translatedToast.errorMsg,
      });
      console.error(error);
    }
  }, [formik, translatedToast, generateOtpCode, handleOpenSnackbar]);

  const login = useCallback(
    async (values, helpers) => {
      try {
        await validateOtpCode({
          phoneNumber: `+966${values.phoneNumber}`,
          otp: values.otp,
        });

        handleOpenSnackbar({
          open: true,
          severity: "success",
          message: translatedToast.login,
        });
        if (isMounted()) {
          // globalThis.location.assign(paths.dashboard.index);
          router.push(paths.dashboard.index);
        }
      } catch (error) {
        handleOpenSnackbar({
          open: true,
          severity: "error",
          message: translatedToast.errorMsg,
        });
        console.error(error);
      }
    },
    [validateOtpCode, isMounted, handleOpenSnackbar, translatedToast, router]
  );

  return (
    <>
      <Head>
        <title>Al-Hayat dashboard login</title>
      </Head>
      <main>
        <div>
          <Stack sx={{ mb: 4 }} spacing={1}>
            <Typography variant="h5">{LoginHeadingTitle}</Typography>
          </Stack>
          <form noValidate onSubmit={formik.handleSubmit}>
            <Stack spacing={3}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
              >
                <TextField
                  autoFocus
                  error={
                    !!(formik.touched.phoneNumber && formik.errors.phoneNumber)
                  }
                  fullWidth
                  helperText={
                    formik.touched.phoneNumber && formik.errors.phoneNumber
                  }
                  label={phoneNumberInput}
                  name="phoneNumber"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="number"
                  value={formik.values.phoneNumber}
                  dir="ltr"
                />
                {isSuccessGenerateOtp && (
                  <LoadingButton
                    size="small"
                    variant="text"
                    onClick={sendOTP}
                    loading={isPendingGenerateOtp}
                  >
                    {sendOtpBtnAgain}
                  </LoadingButton>
                )}
              </Box>
              {/*
             <FormControl
                error={!!(formik.touched.policy && formik.errors.policy)}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  ml: -1,
                  mt: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Checkbox
                    checked={formik.values.policy}
                    name="policy"
                    onChange={formik.handleChange}
                  />
                  <Typography color="text.secondary" variant="body2">
                    {agreeCheckbox}
                  </Typography>
                </Box>
                {!!(formik.touched.policy && formik.errors.policy) && (
                  <FormHelperText>{formik.errors.policy}</FormHelperText>
                )}
              </FormControl>
               */}
              {isSuccessGenerateOtp && (
                <FormControl
                  error={!!(formik.touched.otp && formik.errors.otp)}
                >
                  <FormLabel
                    sx={{
                      display: "block",
                      mb: 2,
                    }}
                  >
                    {codeHeading}
                  </FormLabel>
                  <MuiOtpInput
                    dir={"ltr"}
                    length={6}
                    onBlur={() => formik.handleBlur("otp")}
                    onChange={(value) => formik.setFieldValue("otp", value)}
                    onFocus={() => formik.setFieldTouched("otp")}
                    sx={{
                      "& .MuiFilledInput-input": {
                        p: "14px",
                      },
                    }}
                    value={formik.values.otp}
                  />
                  {!!(formik.touched.otp && formik.errors.otp) && (
                    <FormHelperText>{formik.errors.otp}</FormHelperText>
                  )}
                </FormControl>
              )}
            </Stack>
            {!isSuccessGenerateOtp && (
              <LoadingButton
                fullWidth
                sx={{ mt: 3 }}
                size="large"
                type="button"
                variant="contained"
                onClick={sendOTP}
              >
                {sendCodeBtn}
              </LoadingButton>
            )}
            {isSuccessGenerateOtp && (
              <LoadingButton
                fullWidth
                sx={{ mt: 3 }}
                size="large"
                type="submit"
                variant="contained"
                disabled={!formik.values.otp}
                loading={isPendingValidateOtp}
              >
                {continueBtn}
              </LoadingButton>
            )}
            {/* <Box sx={{ mt: 3 }}>
              <Link
                href={paths.authDemo.forgotPassword.modern}
                underline="hover"
                variant="subtitle2"
              >
                Forgot password?
              </Link>
            </Box> */}
          </form>
        </div>
        <Snackbar
          open={openSnackbar.open}
          autoHideDuration={autoHideDuration}
          anchorOrigin={anchorOrigin}
          onClose={handleCloseSnackbar}
        >
          <Alert severity={openSnackbar.severity}>{openSnackbar.message}</Alert>
        </Snackbar>
        {/* <HomeHero />
        <HomeFeatures />
        <HomeReviews />
        <HomeCta />
        <HomeFaqs /> */}
      </main>
    </>
  );
};

// Page.getLayout = (page) => <MarketingLayout>{page}</MarketingLayout>;
Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;
