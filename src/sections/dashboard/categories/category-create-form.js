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
import { useFormik } from "formik";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup";
import Questions from "./questions";
import {
  useAddCategory,
  useGetCategoryById,
  useUpdateCategory,
} from "../../../hooks/use-categories";
import { paths } from "../../../paths";
import { useRouter } from "next/router";
import useTranslateCategory from "../../../hooks/use-translate-category";
import useSnackbar from "../../../hooks/use-snackbar";
import { VisuallyHiddenInput } from "../../../components/visual-hidden-input";
import Image from "next/image";
import ImageIcon from "@mui/icons-material/Image";
import { useTranslation } from "react-i18next";
import { tokens } from "../../../locales/tokens";
import { stringifyCategoryQuestions } from "../../../utils/parse-category-questions";
import { useValidationMessages } from "../../../hooks/use-validation-messages";
const initialValues = {
  name: "",
  type: "",
};

const CategoryCreateForm = () => {
  const { translatedCategory } = useTranslateCategory();
  const { category: categoryValidationTranslation } = useValidationMessages();
  const validationSchema = useMemo(
    () =>
      Yup.object({
        name: Yup.string().required(
          categoryValidationTranslation.name.required
        ),
        type: Yup.string().required(
          categoryValidationTranslation.type.required
        ),
      }),
    [categoryValidationTranslation]
  );
  const [updatable, setUpdatable] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(undefined);
  const searchParams = useSearchParams();
  const { t } = useTranslation();
  const router = useRouter();
  const { addCategory, isPending: isAddingCategory } = useAddCategory();
  const { updateCategory, isUpdatingCategory } = useUpdateCategory();
  const { category, isGettingCategory } = useGetCategoryById(
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
  const [questionsList, setQuestionsList] = useState([]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, helpers) => handleSubmit(values, helpers),
  });

  const handleClearQuestions = useCallback(() => setQuestionsList([]), []);

  const handleGetImageFile = (evt) => {
    const target = evt.target;
    const file = target.files[0];
    if (!file) {
      return;
    }
    setImageFile(file);
    setImageUrl(URL.createObjectURL(file));
  };

  const handleCreateCategory = useCallback(
    async (categoryData, helpers) => {
      try {
        await addCategory(categoryData);
        handleOpenSnackbar({
          message: translatedToast.createMsg.replace(
            "@",
            `# ${categoryData.get("name")}`
          ),
          severity: "success",
        });
        router.push(paths.dashboard.categories.index);
        helpers.resetForm();
        helpers.setSubmitting(false);
        helpers.setStatus({ success: true });
        handleClearQuestions();
      } catch (error) {
        handleOpenSnackbar({
          message: translatedToast.errorMsg,
          severity: "error",
        });
        console.error("Failed to create category", error);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: error.message });
        helpers.setSubmitting(false);
      }
    },
    [
      addCategory,
      handleClearQuestions,
      handleOpenSnackbar,
      translatedToast,
      router,
    ]
  );

  const handleUpdateCategory = useCallback(
    async (newCategoryData, helpers) => {
      const categoryId = searchParams.get("id");

      newCategoryData.append("id", categoryId);

      try {
        await updateCategory({
          categoryId,
          newCategory: newCategoryData,
        });
        handleOpenSnackbar({
          message: translatedToast.updateMsg.replace(
            "@",
            `# ${newCategoryData.get("name")}`
          ),
          severity: "success",
        });

        router.push(paths.dashboard.categories.index);
        handleClearQuestions();
        helpers.resetForm();
        helpers.setSubmitting(false);
        helpers.setStatus({ success: true });
      } catch (error) {
        console.error("Failed to update category", error);
        handleOpenSnackbar({
          message: translatedToast.errorMsg,
          severity: "error",
        });
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: error.message });
        helpers.setSubmitting(false);
      }
    },
    [
      updateCategory,
      searchParams,
      router,
      handleClearQuestions,
      handleOpenSnackbar,
      translatedToast,
    ]
  );

  const handleSubmit = useCallback(
    async (values, helpers) => {
      try {
        const fd = new FormData();
        fd.append("image", imageFile || imageUrl);
        fd.append("type", values.type);
        fd.append("name", values.name);
        fd.append("questions", stringifyCategoryQuestions(questionsList));

        if (updatable) {
          await handleUpdateCategory(fd, helpers);
        } else {
          await handleCreateCategory(fd, helpers);
        }
      } catch (error) {
        console.error("Failed to submit form", error);
        toast.error("Failed to submit form");
      }
    },
    [updatable, questionsList, handleCreateCategory, handleUpdateCategory]
  );

  useEffect(() => {
    const isUpdating = searchParams.get("update") === "1";

    if (isUpdating && category) {
      formik.setValues({
        name: category?.name,
        type: category?.type,
      });

      setImageUrl(category.imageUrl);
      setQuestionsList(category?.questions);
      setUpdatable(true);
    } else {
      setUpdatable(false);
      formik.resetForm();
    }
  }, [searchParams, category]);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={4}>
          <Card>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
                    {translatedCategory.createCategory.form.basicDetails.title}
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
                          <Image
                            src={imageUrl}
                            width={178}
                            height={178}
                            alt="prd-img-preview"
                          />
                          {isAddingCategory && (
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
                            ? imageFile.name
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
                      label={
                        translatedCategory.createCategory.form.basicDetails
                          .categoryName
                      }
                      name="name"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.name}
                    />
                    <TextField
                      error={!!(formik.touched.type && formik.errors.type)}
                      fullWidth
                      helperText={formik.touched.type && formik.errors.type}
                      label={
                        translatedCategory.createCategory.form.basicDetails
                          .categoryType
                      }
                      name="type"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.type}
                    />
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Questions
            questionsList={questionsList}
            setQuestionsList={setQuestionsList}
          />
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="flex-end"
            spacing={1}
          >
            <LoadingButton color="inherit" sx={{ width: "25%" }}>
              {translatedCategory.createCategory.form.actions.cancel}
            </LoadingButton>
            <LoadingButton
              type="submit"
              variant="contained"
              sx={{ width: "25%" }}
              loading={isUpdatingCategory || isAddingCategory}
            >
              {updatable
                ? translatedCategory.createCategory.form.actions.update
                : translatedCategory.createCategory.form.actions.create}
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

export default CategoryCreateForm;
