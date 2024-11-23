import NextLink from "next/link";
import Head from "next/head";
import {
  Box,
  Breadcrumbs,
  Container,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { BreadcrumbsSeparator } from "../../../components/breadcrumbs-separator";
import { usePageView } from "../../../hooks/use-page-view";
import { Layout as DashboardLayout } from "../../../layouts/dashboard";
import { paths } from "../../../paths";
import ProductCreateForm from "../../../sections/dashboard/product/product-create-form";
import useTranslateProducts from "../../../hooks/use-translate-products";
import { manufacturingOptions } from "../../../sections/dashboard/product/product-create_cars-list";
import {
  useAddProduct,
  useGetProductById,
  useUpdateProduct,
} from "../../../hooks/use-product";
import { useSearchParams } from "next/navigation";
import { useGetCatagories } from "../../../hooks/use-categories";
import { useCallback, useState } from "react";
import { useGetDiscounts } from "../../../hooks/use-discount";

const initialValues = {
  name: "",
  price: "",
  quantity: "",
  discountId: "",
  categoryId: "",
  description: "",
  imageUrl: "",
  imageFile: null,
  submit: null,
  manufacturer: manufacturingOptions[0].label,
  productName: "",
  modelYear: "",
};

const ProductCreate = () => {
  const searchParams = useSearchParams();
  const [categoryPage, setCategoryPage] = useState(1);
  const [discountPage, setDiscountPage] = useState(1);

  const {
    translateProducts: {
      breadcrumb,
      createPage: { headingTitle: headingTitleTranslation },
    },
  } = useTranslateProducts();

  const { updateProductAsync, isLoading: isUpdatingProduct } =
    useUpdateProduct();

  const { addProductAsync, isLoading: isLoadingAddProduct } = useAddProduct();

  const {
    categories,
    isSuccessCategories,
    isPendingCategories,
    isErrorCategories,
    categoriesErrorMsg,
  } = useGetCatagories({
    limit: 10,
    page: categoryPage,
    sortOrder: undefined,
    sortDirection: undefined,
    search: undefined,
  });

  const {
    discounts,
    isSuccessDiscounts,
    isPendingDiscounts,
    isErrorDiscounts,
  } = useGetDiscounts({
    limit: 10,
    page: discountPage,
    orderDirection: undefined,
    sortOrder: undefined,
    search: undefined,
  });

  const { product, isLoadingProduct } = useGetProductById(
    searchParams.get("id")
  );

  const handleGetNextCategoriesPage = useCallback(() => {
    setCategoryPage((p) => p + 1);
  }, []);

  const handleGetPrevCategoriesPage = useCallback(() => {
    setCategoryPage((p) => p - 1);
  }, []);

  const handleGetNextDiscountPage = useCallback(() => {
    setDiscountPage((p) => p + 1);
  }, []);

  const handleGetPrevDiscountPage = useCallback(() => {
    setDiscountPage((p) => p - 1);
  }, []);

  usePageView();

  return (
    <>
      <Head>
        <title>Dashboard: Create Product | Al-Hayat</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack spacing={1}>
              <Typography variant="h4">{headingTitleTranslation}</Typography>
              <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                <Link
                  color="text.primary"
                  component={NextLink}
                  href={paths.dashboard.index}
                  variant="subtitle2"
                >
                  {breadcrumb.dashboard}
                </Link>
                <Link
                  color="text.primary"
                  component={NextLink}
                  href={paths.dashboard.products.index}
                  variant="subtitle2"
                >
                  {breadcrumb.products}
                </Link>
                <Typography color="text.secondary" variant="subtitle2">
                  {breadcrumb.createProduct}
                </Typography>
              </Breadcrumbs>
            </Stack>
            <ProductCreateForm
              initialValues={initialValues}
              product={product}
              isLoadingProduct={isLoadingProduct}
              categoriesData={{
                categories,
                isSuccessCategories,
                isPendingCategories,
                isErrorCategories,
                categoriesErrorMsg,
                page: categoryPage,
                totalPages: categories?.totalPages || 0,
                getNextPage: handleGetNextCategoriesPage,
                getPrevPage: handleGetPrevCategoriesPage,
              }}
              discountsData={{
                discounts,
                isSuccessDiscounts,
                isPendingDiscounts,
                isErrorDiscounts,
                page: discountPage,
                totalPages: discounts?.totalPages || 0,
                getNextPage: handleGetNextDiscountPage,
                getPrevPage: handleGetPrevDiscountPage,
              }}
              onUpdateProduct={updateProductAsync}
              isUpdatingProduct={isUpdatingProduct}
              onAddProduct={addProductAsync}
              isAddingProduct={isLoadingAddProduct}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

ProductCreate.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ProductCreate;
