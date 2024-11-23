import Camera01Icon from "@untitled-ui/icons-react/build/esm/Camera01";
import User01Icon from "@untitled-ui/icons-react/build/esm/User01";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  TextField,
  Typography,
  Unstable_Grid2 as Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { useGeMeData, useUpdateMe } from "../../../hooks/use-user";
import { LoadingButton } from "@mui/lab";
import useTranslateAccount from "../../../hooks/use-translate-account";
import useSnackbar from "../../../hooks/use-snackbar";

const initialValues = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  phoneNumber: "",
};

export const AccountGeneralSettings = (props) => {
  const { translatedAccount } = useTranslateAccount();
  const { updateMeAsync, isUpdatingMeData } = useUpdateMe();
  const { me: userData, isLoadingUserData } = useGeMeData();
  const [isEditing, setIsEditing] = useState(false);
  const {
    anchorOrigin,
    openSnackbar,
    translatedToast,
    handleCloseSnackbar,
    handleOpenSnackbar,
  } = useSnackbar();
  const formik = useFormik({
    initialValues,
    onSubmit: (values, helpers) => handleSubmit(values, helpers),
  });

  const handleSubmit = useCallback(
    async (values, helpers) => {
      try {
        const newData = {
          Lname: values.lastName,
          Fname: values.firstName,
          email: values.email,
          userName: values.userName,
          phoneNumber: values.phoneNumber,
        };
        await updateMeAsync(newData);
        setIsEditing(false);
        console.log(values);
        handleOpenSnackbar({
          severity: "success",
          message: translatedToast.updateProfile,
        });
      } catch (error) {
        handleOpenSnackbar({
          severity: "error",
          message: translatedToast.errorMsg,
        });
      }
    },
    [updateMeAsync, handleOpenSnackbar, translatedToast]
  );

  useEffect(() => {
    if (userData) {
      formik.setValues({
        firstName: userData?.firstName || "",
        lastName: userData?.lastName || "",
        userName: userData?.userName || "",
        email: userData?.email || "",
        phoneNumber: userData?.phoneNumber || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);
  return (
    <Stack
      component={"form"}
      onSubmit={formik.handleSubmit}
      spacing={4}
      {...props}
    >
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid xs={12} md={4}>
              <Typography variant="h6">
                {translatedAccount.profile.headingTitle}
              </Typography>
            </Grid>
            <Grid xs={12} md={8}>
              <Stack spacing={3}>
                <Stack alignItems="center" direction="row" spacing={2}>
                  <Box
                    sx={{
                      borderColor: "neutral.300",
                      borderRadius: "50%",
                      borderStyle: "dashed",
                      borderWidth: 1,
                      p: "4px",
                    }}
                  >
                    <Box
                      sx={{
                        borderRadius: "50%",
                        height: "100%",
                        width: "100%",
                        position: "relative",
                      }}
                    >
                      <Box
                        sx={{
                          alignItems: "center",
                          backgroundColor: (theme) =>
                            alpha(theme.palette.neutral[700], 0.5),
                          borderRadius: "50%",
                          color: "common.white",
                          cursor: "pointer",
                          display: "flex",
                          height: "100%",
                          justifyContent: "center",
                          left: 0,
                          opacity: 0,
                          position: "absolute",
                          top: 0,
                          width: "100%",
                          zIndex: 1,
                          "&:hover": {
                            opacity: 1,
                          },
                        }}
                      >
                        <Stack alignItems="center" direction="row" spacing={1}>
                          <SvgIcon color="inherit">
                            <Camera01Icon />
                          </SvgIcon>
                          <Typography
                            color="inherit"
                            variant="subtitle2"
                            sx={{ fontWeight: 700 }}
                          >
                            Select
                          </Typography>
                        </Stack>
                      </Box>
                      <Avatar
                        // src={avatar}
                        sx={{
                          height: 100,
                          width: 100,
                        }}
                      >
                        <SvgIcon>
                          <User01Icon />
                        </SvgIcon>
                      </Avatar>
                    </Box>
                  </Box>
                  <Button color="inherit" size="small">
                    {translatedAccount.profile.avatar}
                  </Button>
                </Stack>
                <Stack alignItems="center" direction="row" spacing={2}>
                  <Stack
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      gap: "1rem",
                      alignContent: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <TextField
                      defaultValue={formik.values.firstName}
                      value={formik.values.firstName}
                      label={translatedAccount.profile.firstName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="firstName"
                      fullWidth
                      disabled={!isEditing}
                      sx={{ flexGrow: 1 }}
                    />
                  </Stack>
                  <Stack
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      gap: "1rem",
                      alignContent: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <TextField
                      defaultValue={formik.values.lastName}
                      value={formik.values.lastName}
                      label={translatedAccount.profile.lastName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="lastName"
                      fullWidth
                      disabled={!isEditing}
                      sx={{ flexGrow: 1 }}
                    />
                  </Stack>
                </Stack>
                <Stack alignItems="center" direction="row" spacing={2}>
                  <TextField
                    defaultValue={formik.values.email}
                    value={formik.values.email}
                    label={translatedAccount.profile.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="email"
                    disabled={!isEditing}
                    required
                    sx={{
                      flexGrow: 1,
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderStyle: "dashed",
                      },
                    }}
                  />
                </Stack>
                <Stack alignItems="center" direction="row" spacing={2}>
                  <Stack
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      gap: "1rem",
                      alignContent: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <TextField
                      defaultValue={formik.values.phoneNumber}
                      value={formik.values.phoneNumber}
                      label={translatedAccount.profile.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="phoneNumber"
                      fullWidth
                      sx={{ flexGrow: 1 }}
                      disabled={true}
                    />
                    {/* <Button
                      color="inherit"
                      size="small"
                      onClick={handleSavePhoneNumber}
                      sx={{
                        display: isUpdatePhoneNumber ? "block" : "none",
                      }}
                      loading={isUpdatingUserData}
                    >
                      Save
                    </Button>
                    <Button
                      color="inherit"
                      size="small"
                      onClick={() => setUpdatePhoneNumber(true)}
                      sx={{
                        display: isUpdatePhoneNumber ? "none" : "block",
                      }}
                    >
                      edit
                    </Button> */}
                  </Stack>
                  <Stack
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      gap: "1rem",
                      alignContent: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <TextField
                      defaultValue={formik.values.userName}
                      value={formik.values.userName}
                      label={translatedAccount.profile.username}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="userName"
                      disabled={!isEditing}
                      fullWidth
                      sx={{ flexGrow: 1 }}
                    />
                    {/* <Button
                      color="inherit"
                      size="small"
                      sx={{
                        display: isUpdateUserName ? "block" : "none",
                      }}
                      loading={isUpdatingUserData}
                    >
                      Save
                    </Button>
                    <Button
                      color="inherit"
                      size="small"
                      onClick={() => setUpdateUserName(true)}
                      sx={{
                        display: isUpdateUserName ? "none" : "block",
                      }}
                    >
                      edit
                    </Button> */}
                  </Stack>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {/* <Card>
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              xs={12}
              md={4}
            >
              <Typography variant="h6">
                Public profile
              </Typography>
            </Grid>
            <Grid
              xs={12}
              sm={12}
              md={8}
            >
              <Stack
                divider={<Divider />}
                spacing={3}
              >
                <Stack
                  alignItems="flex-start"
                  direction="row"
                  justifyContent="space-between"
                  spacing={3}
                >
                  <Stack spacing={1}>
                    <Typography variant="subtitle1">
                      Make Contact Info Public
                    </Typography>
                    <Typography
                      color="text.secondary"
                      variant="body2"
                    >
                      Means that anyone viewing your profile will be able to see your contacts
                      details.
                    </Typography>
                  </Stack>
                  <Switch />
                </Stack>
                <Stack
                  alignItems="flex-start"
                  direction="row"
                  justifyContent="space-between"
                  spacing={3}
                >
                  <Stack spacing={1}>
                    <Typography variant="subtitle1">
                      Available to hire
                    </Typography>
                    <Typography
                      color="text.secondary"
                      variant="body2"
                    >
                      Toggling this will let your teammates know that you are available for
                      acquiring new projects.
                    </Typography>
                  </Stack>
                  <Switch defaultChecked />
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card> */}
      {/* <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid xs={12} md={4}>
              <Typography variant="h6">Delete Account</Typography>
            </Grid>
            <Grid xs={12} md={8}>
              <Stack alignItems="flex-start" spacing={3}>
                <Typography variant="subtitle1">
                  Delete your account and all of your source data. This is
                  irreversible.
                </Typography>
                <Button color="error" variant="outlined">
                  Delete account
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card> */}
      <Card>
        <CardContent>
          <Grid container spacing={3} justifyContent={"flex-end"}>
            <Grid xs={12} md={4}>
              <Button
                variant="contained"
                fullWidth
                sx={{ backgroundColor: "#fff", color: "#000" }}
                onClick={() => setIsEditing((p) => !p)}
              >
                {isEditing
                  ? translatedAccount.actions.cancel
                  : translatedAccount.actions.update}
              </Button>
            </Grid>
            <Grid xs={12} md={4}>
              <LoadingButton
                variant="contained"
                fullWidth
                type="submit"
                sx={{ backgroundColor: "#fff", color: "#000" }}
                disabled={!isEditing}
                loading={isUpdatingMeData}
              >
                {translatedAccount.actions.saveChanges}
              </LoadingButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Snackbar
        open={openSnackbar.open}
        autoHideDuration={5000}
        anchorOrigin={anchorOrigin}
        onClose={handleCloseSnackbar}
      >
        <Alert severity={openSnackbar.severity}>{openSnackbar.message}</Alert>
      </Snackbar>
    </Stack>
  );
};
