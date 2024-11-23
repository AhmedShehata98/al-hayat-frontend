import { Layout as DashboardLayout } from "../../../../layouts/dashboard";
import Head from "next/head";
import {
  Box,
  Breadcrumbs,
  Container,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { BreadcrumbsSeparator } from "../../../../components/breadcrumbs-separator";
import NextLink from "next/link";
import { paths } from "../../../../paths";
import CategoryCreateForm from "../../../../sections/dashboard/categories/category-create-form";
import useTranslateCategory from "../../../../hooks/use-translate-category";

const CreateCategory = () => {
  const { translatedCategory } = useTranslateCategory();
  return (
    <>
      <Head>Dashboard : create discounts</Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            {/* Heading */}
            <Stack spacing={4}>
              <Stack direction="row" justifyContent="space-between" spacing={4}>
                <Stack spacing={1}>
                  <Typography variant="h4">
                    {translatedCategory.createCategory.headingTitle}
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
                      {translatedCategory.breadcrumb.category}
                    </Link>
                    <Typography color="text.secondary" variant="subtitle2">
                      {translatedCategory.breadcrumb.createCategory}
                    </Typography>
                  </Breadcrumbs>
                </Stack>
              </Stack>
            </Stack>
            {/*End Heading */}
            {/* start category form */}
            <CategoryCreateForm />
            {/* end category create form */}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

CreateCategory.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default CreateCategory;
