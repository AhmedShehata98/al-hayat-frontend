import { useCallback } from "react";
import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Container,
  Grid,
  Link,
  Pagination,
  Paper,
  Snackbar,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Layout as DashboardLayout } from "../../../../layouts/dashboard";
import Head from "next/head";
import NextLink from "next/link";
import { paths } from "../../../../paths";
import { BreadcrumbsSeparator } from "../../../../components/breadcrumbs-separator";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import CouponCard from "../../../../sections/dashboard/offers/coupon-card";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import usePagination from "../../../../hooks/use-pagination";
import useTranslateCoupon from "../../../../hooks/use-translate-coupon";
import useSnackbar from "../../../../hooks/use-snackbar";
import DataListRender from "../../../../components/DataListRender.jsx";
import { QUERY_KEY } from "../../../../constants/query-keys.js";
import { offersService } from "../../../../api/offers/index.js";
const CouponsList = () => {
  const { translateCoupon } = useTranslateCoupon();

  const { handleChangeLimit, handleChangePage, limit, page } = usePagination({
    limit: 12,
    page: 1,
  });

  const {
    anchorOrigin,
    handleCloseSnackbar,
    handleOpenSnackbar,
    openSnackbar,
    translatedToast,
    autoHideDuration,
  } = useSnackbar();
  const router = useRouter();

  const handleUpdateCoupon = useCallback(
    (coupon) => {
      if (!coupon) {
        toast.error("Please select a coupon to edit");
        return;
      }
      const { id: couponId } = coupon;
      router.push(
        `${paths.dashboard.offers.createCoupon}?id=${couponId}&update=1`
      );
    },
    [router]
  );

  const onPageChange = useCallback(
    (_ev, page) => {
      handleChangePage(page);
    },
    [handleChangePage]
  );

  return (
    <>
      <Head>Dashboard : coupons List</Head>
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
                  {translateCoupon.header.headingTitle}
                </Typography>
                <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                  <Link
                    color="text.primary"
                    component={NextLink}
                    href={paths.dashboard.index}
                    variant="subtitle2"
                  >
                    {translateCoupon.breadcrumbs.dashboard}
                  </Link>
                  <Link
                    color="text.primary"
                    component={NextLink}
                    href={paths.dashboard.offers.couponList}
                    variant="subtitle2"
                  >
                    {translateCoupon.breadcrumbs.offers}
                  </Link>
                  <Typography color="text.secondary" variant="subtitle2">
                    {translateCoupon.breadcrumbs.coupons}
                  </Typography>
                </Breadcrumbs>
              </Stack>
              <Stack alignItems="center" direction="row" spacing={3}>
                <Button
                  component={NextLink}
                  href={paths.dashboard.offers.createCoupon}
                  startIcon={
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  {translateCoupon.header.cta}
                </Button>
              </Stack>
            </Stack>
          </Stack>
          {/*End Heading */}
          {/* Coupon Grid View */}
          {
            <DataListRender
              dataExtractor={(data) => data.contentList?.[0].paginatedList}
              enabled={true}
              title={translateCoupon.header.headingTitle}
              queryKey={[QUERY_KEY.COUPONS, page, limit]}
              queryFn={() =>
                offersService.getAllCoupons(undefined, limit, page)
              }
            >
              {({ data }) => {
                return (
                  <Stack flexDirection={"column"}>
                    <Grid
                      width={"100%"}
                      component="ul"
                      padding={0}
                      container
                      spacing={"1rem"}
                      marginTop={"1rem"}
                    >
                      {data.contentList?.[0].paginatedList.map((coupon) => (
                        <Grid
                          key={coupon.id}
                          sx={{ listStyleType: "none" }}
                          item
                          id={"coupon-item"}
                          xs={12}
                          sm={6}
                          md={4}
                          lg={3}
                        >
                          <CouponCard
                            sx={{ width: "100%" }}
                            coupon={coupon}
                            onUpdate={() => handleUpdateCoupon(coupon)}
                          />
                        </Grid>
                      ))}
                    </Grid>
                    <Paper
                      sx={{ width: "100%", padding: "1rem", marginTop: "2rem" }}
                    >
                      <Pagination
                        count={data.contentList?.[0].totalPages || 1}
                        onChange={onPageChange}
                        color={"primary"}
                        page={data.contentList?.[0].currentPage || page}
                        sx={{ width: "100%" }}
                      />
                    </Paper>
                  </Stack>
                );
              }}
            </DataListRender>
          }
        </Container>
      </Box>
      <Snackbar
        open={openSnackbar.open}
        autoHideDuration={autoHideDuration}
        anchorOrigin={anchorOrigin}
        onClose={handleCloseSnackbar}
      >
        <Alert security={openSnackbar.security}>{openSnackbar.message}</Alert>
      </Snackbar>
    </>
  );
};

CouponsList.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default CouponsList;
