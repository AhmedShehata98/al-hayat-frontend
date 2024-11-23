import {
  Box,
  Breadcrumbs,
  Container,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import Head from "next/head";
import { BreadcrumbsSeparator } from "../../../../components/breadcrumbs-separator";
import { paths } from "../../../../paths";
import { Layout as DashboardLayout } from "../../../../layouts/dashboard";
import CreateCouponFrom from "../../../../sections/dashboard/offers/create-coupon-from";
import useTranslateCoupon from "../../../../hooks/use-translate-coupon";

const CreateCoupon = () => {
  const {
    translateCoupon: { createCoupon: createCouponTranslation, breadcrumbs },
  } = useTranslateCoupon();
  return (
    <>
      <Head>Dashboard : create coupons</Head>

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
                    {createCouponTranslation.headingTitle}
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
                      href={paths.dashboard.offers.couponList}
                      variant="subtitle2"
                    >
                      {breadcrumbs.offers}
                    </Link>
                    <Typography color="text.secondary" variant="subtitle2">
                      {breadcrumbs.createCoupon}
                    </Typography>
                  </Breadcrumbs>
                </Stack>
              </Stack>
            </Stack>
            {/*End Heading */}
            {/* Create coupon form */}
            <CreateCouponFrom />
            {/* End create coupon form */}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

CreateCoupon.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default CreateCoupon;
