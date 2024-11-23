import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Card,
  CardContent,
  Grid,
  MenuItem,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useCallback, useMemo } from "react";
import * as Yup from "yup";
import { useAddUser } from "../../../hooks/use-user";
import { useRouter } from "next/router";
import { paths } from "../../../paths";
import useTranslateCustomer from "../../../hooks/use-translate-customer";
import useSnackbar from "../../../hooks/use-snackbar";
import { useValidationMessages } from "../../../hooks/use-validation-messages";

const initialValues = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  role: "Manager",
  submit: false,
};

const CreateUserForm = () => {
  const customerTranslation = useTranslateCustomer();
  const { customerCreate: customerCreateValidation } = useValidationMessages();
  const validationSchema = useMemo(
    () =>
      Yup.object({
        firstName: Yup.string().required(
          customerCreateValidation.firstName.required
        ),
        lastName: Yup.string().required(
          customerCreateValidation.lastName.required
        ),
        phoneNumber: Yup.string()
          // .matches(/^\+966/, "Phone Number should start with +966 saudi code")
          .required(customerCreateValidation.phoneNumber.required)
          .min(
            9,
            customerCreateValidation.phoneNumber.minLength.replace(
              "{minLength}",
              "9"
            )
          )
          .max(
            9,
            customerCreateValidation.phoneNumber.maxLength.replace(
              "{maxLength}",
              "9"
            )
          ),
        role: Yup.string().required(customerCreateValidation.role.required),
      }),
    [customerCreateValidation]
  );

  const {
    anchorOrigin,
    handleCloseSnackbar,
    handleOpenSnackbar,
    openSnackbar,
    translatedToast,
    autoHideDuration,
  } = useSnackbar();
  const { addUser, isLoading } = useAddUser();
  const router = useRouter();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, helpers) => handleSubmit(values, helpers),
  });
  const handleSubmit = useCallback(
    async (values, helpers) => {
      try {
        await addUser({
          firstName: values.firstName,
          lastName: values.lastName,
          phoneNumber: `+966${values.phoneNumber}`,
          role: values.role,
        });
        handleOpenSnackbar({
          message: translatedToast.createUser.replace(
            "@",
            `# ${values.firstName} ${values.lastName}`
          ),
          severity: "success",
        });
        helpers.resetForm();
        helpers.setSubmitting(false);
        helpers.setStatus({ success: true });
        router.push(paths.dashboard.customers.index);
      } catch (error) {
        handleOpenSnackbar({
          message: translatedToast.errorMsg,
          severity: "error",
        });
        router.push(paths.dashboard.categories.index);
        console.error("Failed to create user", error);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: error.message });
        helpers.setSubmitting(false);
      }
    },
    [addUser, handleOpenSnackbar, router, translatedToast]
  );
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={4} marginTop={5}>
          <Card>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
                    {customerTranslation.createPage.form.title}{" "}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Stack spacing={3}>
                    <TextField
                      error={
                        !!(formik.touched.firstName && formik.errors.firstName)
                      }
                      fullWidth
                      helperText={
                        formik.touched.firstName && formik.errors.firstName
                      }
                      label={
                        customerTranslation.createPage.form.inputs.firstName
                      }
                      name="firstName"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.firstName}
                    />
                    <TextField
                      error={
                        !!(formik.touched.lastName && formik.errors.lastName)
                      }
                      fullWidth
                      helperText={
                        formik.touched.lastName && formik.errors.lastName
                      }
                      label={
                        customerTranslation.createPage.form.inputs.lastName
                      }
                      name="lastName"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.lastName}
                    />
                    <TextField
                      error={
                        !!(
                          formik.touched.phoneNumber &&
                          formik.errors.phoneNumber
                        )
                      }
                      fullWidth
                      helperText={
                        formik.touched.phoneNumber && formik.errors.phoneNumber
                      }
                      label={customerTranslation.createPage.form.inputs.phone}
                      name="phoneNumber"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.phoneNumber}
                    />
                    <TextField
                      error={!!(formik.touched.role && formik.errors.role)}
                      fullWidth
                      helperText={formik.touched.role && formik.errors.role}
                      label={customerTranslation.createPage.form.inputs.role}
                      name="role"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.role}
                      select
                    >
                      <MenuItem value={"Admin"}>
                        <Typography variant="body1">
                          {
                            customerTranslation.createPage.form.options.roles
                              .admin
                          }
                        </Typography>
                      </MenuItem>
                      <MenuItem value={"Customer"}>
                        <Typography variant="body1">
                          {
                            customerTranslation.createPage.form.options.roles
                              .customer
                          }
                        </Typography>
                      </MenuItem>
                    </TextField>
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
              {customerTranslation.createPage.form.actions.cancel}
            </LoadingButton>
            <LoadingButton
              type="submit"
              variant="contained"
              sx={{ width: "25%" }}
            >
              {customerTranslation.createPage.form.actions.create}
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

export default CreateUserForm;
