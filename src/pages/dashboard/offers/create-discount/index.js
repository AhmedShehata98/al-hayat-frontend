import { Layout as DashboardLayout } from "../../../../layouts/dashboard";
import Head from "next/head";
import NextLink from "next/link";
import {
  Box,
  Breadcrumbs,
  Container,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { BreadcrumbsSeparator } from "../../../../components/breadcrumbs-separator";
import { paths } from "../../../../paths";
import DiscountCreateForm from "../../../../sections/dashboard/offers/create-discount-from";
import useTranslateDiscounts from "../../../../hooks/use-translate-discounts";

const CreateDiscount = () => {
  const {
    translateDiscounts: { discountCreate, breadcrumbs },
  } = useTranslateDiscounts();

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
                    {discountCreate.headingTitle}
                  </Typography>
                  <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                    <Link
                      color="text.primary"
                      component={NextLink}
                      href={paths.dashboard.index}
                      variant="subtitle2"
                    >
                      {breadcrumbs.dashboard}
                    </Link>
                    <Link
                      color="text.primary"
                      component={NextLink}
                      href={paths.dashboard.offers.discountList}
                      variant="subtitle2"
                    >
                      {breadcrumbs.offers}
                    </Link>
                    <Typography color="text.secondary" variant="subtitle2">
                      {breadcrumbs.createDiscount}
                    </Typography>
                  </Breadcrumbs>
                </Stack>
              </Stack>
            </Stack>
            {/*End Heading */}

            {/* Create Discount form */}
            <DiscountCreateForm />
            {/* End create Discount form */}
          </Stack>
        </Container>
      </Box>
    </>
  );
};
CreateDiscount.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default CreateDiscount;
