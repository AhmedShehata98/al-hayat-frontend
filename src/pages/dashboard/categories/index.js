import { useCallback } from "react";
import { Layout as DashboardLayout } from "../../../layouts/dashboard";
import Head from "next/head";
import {
  Alert,
  Box,
  Breadcrumbs,
  Container,
  Grid,
  LinearProgress,
  Link,
  Pagination,
  Paper,
  Snackbar,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { BreadcrumbsSeparator } from "../../../components/breadcrumbs-separator";
import NextLink from "next/link";
import { paths } from "../../../paths";
import { LoadingButton } from "@mui/lab";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import CategoryCard from "../../../sections/dashboard/categories/category-card";
import NoItemsFoundError from "../../../components/NoItemsFoundError";
import usePagination from "../../../hooks/use-pagination";
import { useGetCatagories } from "../../../hooks/use-categories";
import useTranslateCategory from "../../../hooks/use-translate-category";
import useSnackbar from "../../../hooks/use-snackbar";
import useTranslateNetworkMessages from "../../../hooks/use-translate-network-msgs.js";

const CategoriesList = () => {
  const { translatedCategory } = useTranslateCategory();
  const { noFoundResources, currentLang } = useTranslateNetworkMessages();

  const { handleChangeLimit, handleChangePage, limit, page } = usePagination({
    limit: 12,
    page: 1,
  });

  const {
    categories,
    isSuccessCategories,
    isPendingCategories,
    isErrorCategories,
    categoriesErrorMsg,
  } = useGetCatagories({
    sortOrder: "isUsed",
    sortDirection: "desc",
    page,
    limit,
  });
  const {
    anchorOrigin,
    handleCloseSnackbar,
    handleOpenSnackbar,
    openSnackbar,
    translatedToast,
    autoHideDuration,
  } = useSnackbar();
  const onPageChange = useCallback(
    (_ev, page) => {
      handleChangePage(page);
    },
    [handleChangePage]
  );

  return (
    <>
      <Head>Dashboard : Offers List</Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          {/* Heading */}
          <Stack spacing={4}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">
                  {translatedCategory.headingTitle}
                </Typography>
                <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                  <Link
                    color="text.primary"
                    component={NextLink}
                    href={paths.dashboard.index}
                    variant="subtitle2"
                  >
                    {translatedCategory.breadcrumb.dashboard}
                  </Link>
                  <Link
                    color="text.primary"
                    component={NextLink}
                    href={paths.dashboard.categories.index}
                    variant="subtitle2"
                  >
                    {translatedCategory.headingTitle}
                  </Link>
                  <Typography color="text.secondary" variant="subtitle2">
                    {translatedCategory.breadcrumb.category}
                  </Typography>
                </Breadcrumbs>
              </Stack>
              <Stack alignItems="center" direction="row" spacing={3}>
                <LoadingButton
                  component={NextLink}
                  href={paths.dashboard.categories.create}
                  startIcon={
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  {translatedCategory.ctaBtn}
                </LoadingButton>
              </Stack>
            </Stack>
          </Stack>
          {/*End Heading */}

          {isPendingCategories && <LinearProgress />}

          {/* category list */}
          <Grid
            component="ul"
            padding={0}
            container
            spacing={"1rem"}
            marginTop={"1rem"}
          >
            {isSuccessCategories &&
              categories.paginatedList.map((category) => (
                <Grid
                  key={category.id}
                  sx={{ listStyleType: "none" }}
                  item
                  id={"category-item"}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                >
                  <CategoryCard
                    category={category}
                    handleOpenSnackbar={handleOpenSnackbar}
                    translatedToast={translatedToast}
                  />
                </Grid>
              ))}
          </Grid>
          <Paper sx={{ padding: "1rem", marginTop: "2rem" }}>
            <Pagination
              count={categories?.totalPages || 0}
              onChange={onPageChange}
              color={"primary"}
            />
          </Paper>
          {/* end category list */}
          {/* category not found error */}
          {!isPendingCategories && isErrorCategories && (
            <NoItemsFoundError
              errorMessage={noFoundResources.message.replace(
                "{resourceName}",
                currentLang === "en" ? "category" : "التصنيف"
              )}
            />
          )}
          {/* End category not found error */}
        </Container>
      </Box>
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

CategoriesList.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default CategoriesList;
