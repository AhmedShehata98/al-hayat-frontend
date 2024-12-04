import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import useSnackbar from "../../../hooks/use-snackbar";
import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  Grid,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { tokens } from "../../../locales/tokens";
import Image from "next/image";
import { useFormik } from "formik";
import {
  useAddMaintenanceService,
  useUpdateMaintenanceService,
} from "../../../hooks/use-maintenance";
import { LoadingButton } from "@mui/lab";
import { VisuallyHiddenInput } from "../../../components/visual-hidden-input";
import ImageIcon from "@mui/icons-material/Image";
import SubCategoryList from "./SubCategoryList";
import { paths } from "../../../paths";

function MaintenanceCategoryForm({ initialValues }) {
  const [t] = useTranslation();
  const validationSchema = useMemo(
    () =>
      Yup.object({
        name: Yup.string().required(
          t(tokens.validationMessages.maintenanceCategories.name)
        ), // TODO: Add message translation

        image: Yup.mixed(), // TODO: Add message translation

        isUpdatedImage: Yup.boolean().default(false),

        // add validation for subCategoriesList values id array of strings and must have at least one item
        subCategoriesList: Yup.array()
          .of(Yup.string().required())
          .min(
            1,
            t(tokens.validationMessages.maintenanceCategories.subCategorys)
          ), // TODO: Add message translation
      }),
    [t]
  );
  const [imageUrl, setImageUrl] = useState(undefined);
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

  const { addMaintenanceService, isAddingMaintenanceService } =
    useAddMaintenanceService();

  const { updateMaintenanceService, isUpdatingMaintenanceService } =
    useUpdateMaintenanceService();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, helpers) => handleSubmit(values, helpers),
  });

  const handleGetImageFile = (event) => {
    const file = event.target.files[0];
    if (!file) {
      console.error("No file selected");
      return;
    }

    formik.setFieldValue("image", file);
    formik.setFieldValue("isUpdatedImage", true);
    setImageUrl(URL.createObjectURL(file));
  };

  const handleUpdateCategory = useCallback(
    async (data) => {
      const fd = new FormData();
      try {
        if (data.isUpdatedImage) {
          fd.append("Image", data.image);
        }
        fd.append("Name", data.name);
        for (const subCategory of data.subCategoriesList) {
          fd.append("SubRepairs", subCategory);
        }

        await updateMaintenanceService({
          newServiceData: fd,
          serviceId: searchParams.get("id"),
        });
        handleOpenSnackbar({
          severity: "success",
          message: t(tokens.toastMessages.updateMsg).replace("@", data.name),
        });
        router.push(paths.dashboard.maintenance.category);
      } catch (error) {
        console.log("Error updating maintenance service", error);
        handleOpenSnackbar({
          severity: "error",
          message: t(tokens.toastMessages.errorMsg),
        });
      }
    },
    [updateMaintenanceService, handleOpenSnackbar, t, router]
  );

  const handleCreateCategory = useCallback(
    async (data) => {
      try {
        const formData = new FormData();
        if (data.isUpdatedImage) {
          fd.append("Image", data.image);
        }
        formData.append("Name", data.name);

        for (const subCategory of data.subCategoriesList) {
          formData.append("SubRepairs", subCategory);
        }

        await addMaintenanceService(formData);
        handleOpenSnackbar({
          severity: "success",
          message: t(tokens.toastMessages.createMsg).replace("@", data.name),
        });
        router.push(paths.dashboard.maintenance.category);
      } catch (error) {
        console.log("Error adding maintenance service", error);
        handleOpenSnackbar({
          severity: "error",
          message: t(tokens.toastMessages.errorMsg),
        });
      }
    },
    [router, t, addMaintenanceService, handleOpenSnackbar]
  );

  function handleSubmit(values, helpers) {
    const isUpdatable = searchParams.get("update") === "1";
    if (isUpdatable) {
      handleUpdateCategory(values);
    } else {
      handleCreateCategory(values);
    }
  }

  useEffect(() => {
    if (searchParams.get("update") === "1") {
      formik.setValues({
        name: initialValues.name,
        image: initialValues.image,
        subCategoriesList: initialValues.subCategoriesList,
      });
      setImageUrl(initialValues.image);
      formik.setFieldValue("isUpdatedImage", false);
    }
  }, [searchParams, initialValues]);

  console.log(formik.errors);
  console.log(formik.values);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={4}>
          <Card>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
                    {t(tokens.maintenanceCategoriesCreate.headingTitle)}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Stack spacing={3}>
                    <FormControl
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem",
                        mb: 4,
                      }}
                    >
                      {imageUrl && (
                        <Box
                          sx={{
                            position: "relative",
                            width: 178,
                            height: 178,
                            borderRadius: "3px",
                            overflow: "hidden",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {formik.errors.image && formik.touched.image && (
                            <Typography variant="subtitle2" color="error">
                              {formik.errors.image}
                            </Typography>
                          )}
                          <Image
                            src={imageUrl}
                            width={178}
                            height={178}
                            alt="prd-img-preview"
                          />
                          {isAddingMaintenanceService && (
                            <Box
                              sx={{
                                position: "absolute",
                                inset: "0",
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "0.5rem",
                                backgroundColor: "rgba(0, 0, 0,0.5)",
                              }}
                            >
                              <CircularProgress />
                              <Typography variant="subtitle2">
                                {t(tokens.common.processing)}
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      )}
                      <LoadingButton
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<ImageIcon />}
                        size="small"
                        sx={{ borderRadius: "3px" }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            display: "block",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            maxWidth: 128,
                            lineHeight: "1.2",
                          }}
                        >
                          {imageUrl
                            ? formik.values?.image?.name ||
                              imageUrl?.split("/").pop()
                            : t(tokens.common.uploadImage)}
                        </Typography>
                        <VisuallyHiddenInput
                          type="file"
                          onChange={handleGetImageFile}
                        />
                      </LoadingButton>
                    </FormControl>
                    <TextField
                      error={!!(formik.touched.name && formik.errors.name)}
                      fullWidth
                      helperText={formik.touched.name && formik.errors.name}
                      label={t(
                        tokens.maintenanceCategoriesCreate.properties.name
                      )}
                      name="name"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.name}
                    />
                    <SubCategoryList
                      initialValues={initialValues.subCategoriesList}
                      onChange={(values) =>
                        formik.setFieldValue("subCategoriesList", values)
                      }
                      onBlur={formik.handleBlur}
                      error={
                        !!(
                          formik.touched[":r4:"] &&
                          formik.errors.subCategoriesList
                        )
                      }
                      helperText={
                        formik.touched[":r4:"] &&
                        formik.errors.subCategoriesList
                      }
                    />
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
              {t(tokens.common.cancelBtn)}
            </LoadingButton>
            <LoadingButton
              type="submit"
              variant="contained"
              sx={{ width: "25%" }}
              loading={isAddingMaintenanceService}
              disabled={!formik.isValid || isAddingMaintenanceService}
            >
              {searchParams.get("update") === "1"
                ? t(tokens.common.updateBtn)
                : t(tokens.common.saveBtn)}
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

export default MaintenanceCategoryForm;
