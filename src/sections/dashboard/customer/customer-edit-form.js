import PropTypes from "prop-types";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useUpdateUser } from "../../../hooks/use-user";
import useTranslateCustomer from "../../../hooks/use-translate-customer";
import useSnackbar from "../../../hooks/use-snackbar";
import { Snackbar, Alert } from "@mui/material";

const validationSchema = Yup.object({
  address1: Yup.string().max(255),
  address2: Yup.string().max(255),
  location: Yup.string().max(255),
  country: Yup.string().max(255),
  email: Yup.string().email("Must be a valid email").max(255),
  userName: Yup.string().max(255),
  isAvailable: Yup.bool(),
  twoFactorEnabled: Yup.bool(),
  isVerified: Yup.bool(),
  firstName: Yup.string().max(255),
  lastName: Yup.string().max(255),
  phone: Yup.string().max(15),
  state: Yup.string().max(255),
});

export const CustomerEditForm = (props) => {
  const translatedCustomer = useTranslateCustomer();
  const { customer, ...other } = props;
  const { updateUserAsync, isLoading: isUpdatingUser } = useUpdateUser();
  const {
    anchorOrigin,
    handleCloseSnackbar,
    handleOpenSnackbar,
    openSnackbar,
    translatedToast,
    autoHideDuration,
  } = useSnackbar();
  const formik = useFormik({
    initialValues: {
      address1: customer.address1 || "",
      address2: customer.address2 || "",
      country: customer.country || "",
      email: customer.email || "",
      location: customer.currentLocation || "",
      userName: customer.userName || "",
      isAvailable: customer.isAvailable || false,
      twoFactorEnabled: customer.twoFactorEnabled || false,
      isVerified: customer.isVerified || false,
      twoFactorEnabled: customer.twoFactorEnabled || false,
      firstName: customer.firstName || "",
      lastName: customer.lastName || "",
      name: customer.name || "",
      phone: customer.phoneNumber || "",
      state: customer.state || "",
      submit: null,
    },
    validationSchema,
    onSubmit: (values, helpers) => handleUpdateCustomer(values, helpers),
  });

  const handleUpdateCustomer = async (values, helpers) => {
    try {
      await updateUserAsync({
        userId: customer.id,
        newUserData: {
          id: customer.id,
          firstName: values.firstName,
          lastName: values.lastName,
        },
      });
      console.log({
        id: customer.id,
        firstName: values.firstName,
        lastName: values.lastName,
      });
      helpers.setStatus({ success: true });
      helpers.setSubmitting(false);
      handleOpenSnackbar({
        message: translatedToast.updateUser.replace(
          "@",
          `# ${values.firstName} ${values.lastName}`
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
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit} {...other}>
        <Card>
          <CardHeader title={translatedCustomer.editPage.HeadingTitle} />
          <CardContent sx={{ pt: 0 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  error={
                    !!(formik.touched.firstName && formik.errors.firstName)
                  }
                  fullWidth
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                  label={translatedCustomer.editPage.inputs.firstName}
                  name="firstName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  required
                  value={formik.values.firstName}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  error={!!(formik.touched.lastName && formik.errors.lastName)}
                  fullWidth
                  helperText={formik.touched.lastName && formik.errors.lastName}
                  label={translatedCustomer.editPage.inputs.lastName}
                  name="lastName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  required
                  value={formik.values.lastName}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label={translatedCustomer.editPage.inputs.email}
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  error={!!(formik.touched.userName && formik.errors.userName)}
                  fullWidth
                  helperText={formik.touched.userName && formik.errors.userName}
                  label={translatedCustomer.editPage.inputs.userName}
                  name="userName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.userName}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  error={!!(formik.touched.location && formik.errors.location)}
                  fullWidth
                  helperText={formik.touched.location && formik.errors.location}
                  label={translatedCustomer.editPage.inputs.location}
                  name="location"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.location}
                />
              </Grid>
              {/* <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.state && formik.errors.state)}
                fullWidth
                helperText={formik.touched.state && formik.errors.state}
                label={translatedCustomer.editPage.inputs.stateOrRegion}
                name="state"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.state}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.address1 && formik.errors.address1)}
                fullWidth
                helperText={formik.touched.address1 && formik.errors.address1}
                label={translatedCustomer.editPage.inputs.address1}
                name="address1"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.address1}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.address2 && formik.errors.address2)}
                fullWidth
                helperText={formik.touched.address2 && formik.errors.address2}
                label={translatedCustomer.editPage.inputs.address2}
                name="address2"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.address2}
              />
            </Grid> */}
              <Grid xs={12} md={6}>
                <TextField
                  error={!!(formik.touched.phone && formik.errors.phone)}
                  fullWidth
                  helperText={formik.touched.phone && formik.errors.phone}
                  label={translatedCustomer.editPage.inputs.phone}
                  name="phone"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                />
              </Grid>
            </Grid>
            {/* <Stack divider={<Divider />} spacing={3} sx={{ mt: 3 }}>
            <Stack
              alignItems="center"
              direction="row"
              justifyContent="space-between"
              spacing={3}
            >
              <Stack spacing={1}>
                <Typography gutterBottom variant="subtitle1">
                  Two Factor Authentication
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  Toggling this will enable two factor authentication for your
                  account
                </Typography>
              </Stack>
              <Switch
                checked={formik.values.twoFactorEnabled}
                color="primary"
                edge="start"
                name="twoFactorEnabled"
                onChange={formik.handleChange}
                value={formik.values.twoFactorEnabled}
              />
            </Stack>
            <Stack
              alignItems="center"
              direction="row"
              justifyContent="space-between"
              spacing={3}
            >
              <Stack spacing={1}>
                <Typography gutterBottom variant="subtitle1">
                  Available to hire
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  Toggling this will let your teammates know that you are
                  available for acquiring new projects
                </Typography>
              </Stack>
              <Switch
                checked={formik.values.isAvailable}
                color="primary"
                edge="start"
                name="isAvailable"
                onChange={formik.handleChange}
                value={formik.values.isAvailable}
              />
            </Stack>
          </Stack> */}
          </CardContent>
          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            flexWrap="wrap"
            spacing={3}
            sx={{ p: 3 }}
          >
            <LoadingButton
              disabled={formik.isSubmitting}
              type="submit"
              loading={isUpdatingUser}
              variant="contained"
            >
              {translatedCustomer.editPage.actions.update}
            </LoadingButton>
            <Button color="inherit" disabled={formik.isSubmitting}>
              {translatedCustomer.editPage.actions.cancel}
            </Button>
          </Stack>
        </Card>
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

CustomerEditForm.propTypes = {
  // @ts-ignore
  customer: PropTypes.object.isRequired,
};
