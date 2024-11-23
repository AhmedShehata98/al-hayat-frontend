import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Button,
  Stack,
  LinearProgress,
  Alert,
  Snackbar,
  Card,
  CardContent,
  Grid,
  Typography,
  FormControlLabel,
  Switch,
  Box,
  TextField,
  Autocomplete,
  MenuItem,
  CircularProgress,
  Chip,
  Avatar,
  Paper,
  Checkbox,
} from "@mui/material";
import { paths } from "../../../paths";

import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";
import { useAddProduct, useUpdateProduct } from "../../../hooks/use-product";
import {
  parseCategoryAnswers,
  parseCategoryQuestions,
  stringifyCategoryAnswers,
} from "../../../utils/parse-category-questions";
import useTranslateProducts from "../../../hooks/use-translate-products";
import { useRecoilState } from "recoil";
import { productsAtoms } from "../../../atoms/products-atoms";
import useSnackbar from "../../../hooks/use-snackbar";
import Answers from "./Answers";
import { Textarea } from "../../../components/text-area";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ImageInput from "../../components/image-input";
import useTranslateDiscounts from "../../../hooks/use-translate-discounts";
import { prefixImageUrl } from "../../../utils/prefixImageUrl";
import { useDebounceValue } from "usehooks-ts";
import { carsList } from "./product-create_cars-list";
import { useValidationMessages } from "../../../hooks/use-validation-messages";

//
//
//
//
//

const ProductCreateForm = (props) => {
  const {
    initialValues,
    product,
    isLoadingProduct,
    categoriesData,
    discountsData,
    onUpdateProduct,
    isUpdatingProduct,
    isAddingProduct,
    onAddProduct,
    ...rest
  } = props;
  const { products: productsValidationMsgs } = useValidationMessages();
  const validationSchema = useMemo(() => {
    return Yup.object({
      imageUrl: Yup.string(),
      name: Yup.string()
        .required(productsValidationMsgs.name.required)
        .max(
          255,
          productsValidationMsgs.name.maxLength.replace("{maxLength}", 255)
        ),
      price: Yup.number().required(productsValidationMsgs.price.required),
      quantity: Yup.number().required(productsValidationMsgs.quantity.required),
      discountId: Yup.number(),
      categoryId: Yup.number().required(
        productsValidationMsgs.category.required
      ),
      description: Yup.string()
        .max(
          500,
          productsValidationMsgs.description.maxLength.replace(
            "{maxLength}",
            500
          )
        )
        .required(productsValidationMsgs.description.required),
    });
  }, [productsValidationMsgs]);

  const {
    translateProducts: {
      createPage: {
        actions: actionsTranslation,
        forms: formsTranslation,
        headings,
      },
    },
  } = useTranslateProducts();

  const {
    translateDiscounts: { discountTable, headingTitle },
  } = useTranslateDiscounts();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, helpers) => handleSubmit(values, helpers),
  });

  // React Recoil
  const [productsAtomState, setProductsAtomState] =
    useRecoilState(productsAtoms);

  // Next JS Hooks
  const searchParams = useSearchParams();
  const router = useRouter();

  // References

  // React State
  const [updatable, setUpdatable] = useState(false);

  // Custom Hooks
  const {
    anchorOrigin,
    handleCloseSnackbar,
    handleOpenSnackbar,
    openSnackbar,
    translatedToast,
    autoHideDuration,
  } = useSnackbar();

  const productsList = useMemo(
    () => carsList[formik.values.manufacturer]?.modelLine || [],
    [formik.values.manufacturer]
  );
  const yearsList = useMemo(
    () => carsList[formik.values.manufacturer]?.modelYear || [],
    [formik.values.manufacturer]
  );

  // Memoized components

  const MemoizedImageInput = useCallback(
    (props) => <ImageInput {...props} />,
    []
  );

  // Methods

  const handlePushQuestions = useCallback(
    (questions) => {
      setProductsAtomState((prevState) => ({
        ...prevState,
        questions: parseCategoryQuestions(questions),
      }));
    },
    [setProductsAtomState]
  );

  const handleCreateProduct = useCallback(
    async (productData, helpers) => {
      try {
        await onAddProduct(productData);
        router.push(paths.dashboard.products.index);
        handleOpenSnackbar({
          message: translatedToast.createMsg.replace(
            "@",
            `# ${productData.get("name")}`
          ),
          severity: "success",
        });
        helpers.setStatus({ success: true });
        helpers.setErrors({ submit: null });
        helpers.setSubmitting(false);
      } catch (err) {
        handleOpenSnackbar({
          message: translatedToast.errorMsg,
          severity: "error",
        });
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
    [onAddProduct, handleOpenSnackbar, translatedToast, router]
  );

  const handleUpdateProduct = useCallback(
    async (productData, helpers) => {
      try {
        const productId = searchParams.get("id");
        productData.append("id", productId);

        await onUpdateProduct({ productId, newProduct: productData });
        router.push(paths.dashboard.products.index);
        handleOpenSnackbar({
          message: translatedToast.updateMsg.replace(
            "@",
            `# ${productData.get("name")}`
          ),
          severity: "success",
        });
        helpers.setSubmitting(false);
        helpers.setStatus({ success: true });
        helpers.setErrors({ submit: null });
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
    [searchParams, handleOpenSnackbar, onUpdateProduct, translatedToast, router]
  );

  const handleSubmit = useCallback(
    async (values, helpers) => {
      const fd = new FormData();
      fd.append("name", values.name);
      fd.append("price", values.price);
      fd.append("quantity", values.quantity);
      if (values.imageFile) {
        fd.append("Image", values.imageFile);
      }
      if (values.imageUrl) {
        fd.append("ImageUrl", values.imageUrl);
      }
      if (values.discountId) {
        fd.append("discountId", values.discountId);
      }
      fd.append("categoryId", values.categoryId);
      fd.append("description", values.description);
      fd.append("answers", stringifyCategoryAnswers(productsAtomState.answers));

      try {
        if (updatable) {
          await handleUpdateProduct(fd, helpers);
        } else {
          await handleCreateProduct(fd, helpers);
        }
      } catch (err) {
        console.error(err);
      }
    },
    [
      handleCreateProduct,
      handleUpdateProduct,
      updatable,
      productsAtomState.answers,
    ]
  );

  const callbackSetFieldValue = useCallback(
    (fieldName, value) => {
      formik.setFieldValue(fieldName, value);
    },
    [formik]
  );

  useEffect(() => {
    const updateParam = searchParams.get("update") === "1";
    const productData = product?.contentList?.[0];

    if (updateParam) {
      if (!productData) return;
      formik.setValues({
        name: productData.name || initialValues.name,
        price: productData.price || initialValues.price,
        quantity: productData.quantity || initialValues.quantity,
        categoryId: productData.categoryId || initialValues.categoryId,
        discountId: productData.discountId || initialValues.discountId,
        description: productData.description || initialValues.description,
        imageUrl: prefixImageUrl(productData.imageUrl),
      });

      setProductsAtomState({
        questions: parseCategoryQuestions(productData.category.questions),
        answers: parseCategoryAnswers(productData.answers),
      });

      setUpdatable(true);
    } else {
      formik.resetForm();
      setProductsAtomState({ questions: [], answers: [] });
      setUpdatable(false);
    }
  }, [initialValues, updatable, searchParams, product, setProductsAtomState]);

  return (
    <>
      {isLoadingProduct && updatable && <LinearProgress />}
      <form onSubmit={formik.handleSubmit} {...rest}>
        <Stack spacing={4}>
          {/* Start category Inputs */}
          <Card>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
                    {headings.category}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "1rem",
                    }}
                  >
                    <TextField
                      fullWidth
                      error={
                        !!(
                          formik.touched.categoryId && formik.errors.categoryId
                        )
                      }
                      label={
                        formsTranslation.categoryForm.inputs.categorySelect
                      }
                      name="categoryId"
                      value={formik.values.categoryId}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      defaultChecked={
                        categoriesData.isErrorCategories ? "0" : undefined
                      }
                      disabled={categoriesData.isPendingCategories}
                      select
                      MenuProps={{ PaperProps: { style: { maxHeight: 220 } } }}
                    >
                      {categoriesData.isSuccessCategories &&
                        categoriesData.categories.paginatedList.map(
                          (category) => {
                            return (
                              <MenuItem
                                key={category.id}
                                value={category.id}
                                onClick={() =>
                                  handlePushQuestions(category.questions)
                                }
                              >
                                <Box
                                  sx={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "flex-start",
                                    justifyContent: "center",
                                    flexDirection: "column",
                                    paddingBlock: "0.5rem",
                                  }}
                                >
                                  <Typography variant="body1">
                                    {category.name}
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    color={"text.secondary"}
                                  >
                                    {category.type}
                                  </Typography>
                                </Box>
                              </MenuItem>
                            );
                          }
                        )}

                      {categoriesData.categories && (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: "1rem",
                            paddingBlock: "1rem",
                          }}
                        >
                          <Button
                            onClick={categoriesData.getNextPage}
                            size={"small"}
                            sx={{ marginX: "auto" }}
                            variant="contained"
                            disabled={
                              categoriesData.page >= categoriesData.totalPages
                            }
                          >
                            <ArrowForwardIcon />
                          </Button>

                          <Typography variant="body1">
                            Page {categoriesData.page} of{" "}
                            {categoriesData.totalPages}
                          </Typography>
                          <Button
                            onClick={categoriesData.getPrevPage}
                            size={"small"}
                            sx={{ marginX: "auto" }}
                            variant="contained"
                            disabled={categoriesData.page === 1}
                          >
                            <ArrowBackIcon />
                          </Button>
                        </Box>
                      )}
                      {categoriesData.isErrorCategories && (
                        <MenuItem>
                          {categoriesData.categoriesErrorMsg?.message.toString()}
                        </MenuItem>
                      )}
                    </TextField>
                    {categoriesData.isPendingCategories && <CircularProgress />}
                  </Box>
                  <Answers />
                  {/* Start Description */}
                  <Box sx={{ marginTop: "2rem" }}>
                    <Textarea
                      aria-label={
                        formsTranslation.categoryForm.inputs.description
                      }
                      minRows={3}
                      name="description"
                      placeholder={
                        formsTranslation.categoryForm.inputs.briefPlaceholder
                      }
                      onChange={(ev) => formik.handleChange(ev)}
                      value={formik.values.description}
                    />
                  </Box>
                  {formik.errors.description && (
                    <Typography variant="body1" color={"red"}>
                      {formik.errors.description}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          {/* end category Inputs */}
          {/* Start basics details Inputs */}
          <Card>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
                    {headings.basics}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Stack spacing={3}>
                    <MemoizedImageInput
                      imageFile={formik.values.imageFile}
                      imageUrl={formik.values.imageUrl}
                      name={"product"}
                      onChangeFile={(_evt, file) =>
                        callbackSetFieldValue("imageFile", file)
                      }
                      onChangeUrl={(evt) =>
                        callbackSetFieldValue("imageUrl", evt.target.value)
                      }
                      onReset={() => {
                        callbackSetFieldValue("imageFile", null);
                        callbackSetFieldValue("imageUrl", "");
                      }}
                    />
                    {formik.touched.imageUrl && formik.errors.imageUrl && (
                      <Typography variant="body1" color={"red"}>
                        {productsValidationMsgs.image.required}
                      </Typography>
                    )}
                    <TextField
                      error={!!(formik.touched.name && formik.errors.name)}
                      fullWidth
                      helperText={formik.touched.name && formik.errors.name}
                      label={formsTranslation.basicsForm.inputs.productName}
                      name="name"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.name}
                    />
                    <TextField
                      error={!!(formik.touched.price && formik.errors.price)}
                      fullWidth
                      helperText={formik.touched.price && formik.errors.price}
                      label={formsTranslation.basicsForm.inputs.price}
                      name="price"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="number"
                      value={formik.values.price}
                    />
                    <TextField
                      error={
                        !!(formik.touched.quantity && formik.errors.quantity)
                      }
                      fullWidth
                      helperText={
                        formik.touched.quantity && formik.errors.quantity
                      }
                      label={formsTranslation.basicsForm.inputs.quantity}
                      name="quantity"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="number"
                      value={formik.values.quantity}
                    />
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          {/* End basics details Inputs */}
          {/* Start discount Inputs */}
          <Card>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
                    {headings.discount}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "1rem",
                    }}
                  >
                    <TextField
                      error={
                        !!(
                          formik.touched.discountId && formik.errors.discountId
                        )
                      }
                      fullWidth
                      label={
                        formsTranslation.discountForm.inputs.discountSelect
                      }
                      name="discountId"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      select
                      disabled={discountsData.isPendingDiscounts}
                      value={formik.values.discountId}
                      MenuProps={{ PaperProps: { style: { maxHeight: 220 } } }}
                    >
                      {discountsData.isSuccessDiscounts &&
                        discountsData.discounts.paginatedList.map(
                          (discount) => (
                            <MenuItem
                              key={discount.id}
                              value={discount.id}
                              sx={{ marginBlockEnd: "0.7rem" }}
                            >
                              <Paper
                                sx={{
                                  width: "100%",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "flex-start",
                                  gap: "0.5rem",
                                  bgcolor: "inherit",
                                }}
                              >
                                <Avatar
                                  sx={{
                                    width: "3rem",
                                    height: "3rem",
                                    bgcolor: discount.active
                                      ? "#117554"
                                      : "#C96868",
                                    color: "#f6f6f6",
                                  }}
                                >
                                  {`${discount.discountPercentage}%`}
                                </Avatar>
                                <Box
                                  sx={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "flex-start",
                                    justifyContent: "center",
                                    flexDirection: "column",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      width: "100%",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "space-between",
                                      gap: "0.5rem",
                                    }}
                                  >
                                    <Typography variant="h6" color={"#1E201E"}>
                                      {discount.name}
                                    </Typography>
                                    <Chip
                                      color={
                                        discount.active ? "success" : "error"
                                      }
                                      size="small"
                                      label={
                                        discount.active
                                          ? discountTable.columns.active
                                          : discountTable.columns.inActive
                                      }
                                    />
                                  </Box>
                                  <Typography
                                    variant="caption"
                                    color={"text.secondary"}
                                  >{`${discount.discription}`}</Typography>
                                </Box>
                              </Paper>
                            </MenuItem>
                          )
                        )}
                      {discountsData.discounts && (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: "1rem",
                            paddingBlock: "1rem",
                          }}
                        >
                          <Button
                            onClick={discountsData.getNextPage}
                            size={"small"}
                            sx={{ marginX: "auto" }}
                            variant="contained"
                            disabled={
                              discountsData.page >= discountsData.totalPages
                            }
                          >
                            <ArrowForwardIcon />
                          </Button>

                          <Typography variant="body1">
                            Page {discountsData.page} of{" "}
                            {discountsData.totalPages}
                          </Typography>
                          <Button
                            onClick={discountsData.getPrevPage}
                            size={"small"}
                            sx={{ marginX: "auto" }}
                            variant="contained"
                            disabled={discountsData.page == 1}
                          >
                            <ArrowBackIcon />
                          </Button>
                        </Box>
                      )}
                      {discountsData.isErrorDiscounts && (
                        <MenuItem value={"-1"} disabled>
                          <Typography variant="overline">
                            there is no discounts to display
                          </Typography>
                        </MenuItem>
                      )}
                    </TextField>
                    {discountsData.isPendingDiscounts && <CircularProgress />}
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          {/* End discount Inputs */}

          <Stack
            alignItems="center"
            direction="row"
            justifyContent="flex-end"
            spacing={1}
          >
            <Button color="inherit">{actionsTranslation.cancel}</Button>
            <LoadingButton
              loading={isAddingProduct || isUpdatingProduct}
              type="submit"
              variant="contained"
            >
              {updatable
                ? actionsTranslation.update
                : actionsTranslation.create}
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
export default ProductCreateForm;
