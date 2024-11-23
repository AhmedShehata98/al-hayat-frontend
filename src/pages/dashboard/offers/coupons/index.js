import { useCallback } from "react";
import {
    Alert,
    AlertTitle,
    Box,
    Breadcrumbs,
    Button,
    Container, Grid,
    LinearProgress,
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
import { useDeleteCoupon, useGetCoupons } from "../../../../hooks/use-coupon";
import usePagination from "../../../../hooks/use-pagination";
import useTranslateCoupon from "../../../../hooks/use-translate-coupon";
import useSnackbar from "../../../../hooks/use-snackbar";
import useTranslateNetworkMessages from "../../../../hooks/use-translate-network-msgs.js";
const CouponsList = () => {
  const { translateCoupon } = useTranslateCoupon();
  const { noFoundResources, currentLang } = useTranslateNetworkMessages();

  const { handleChangeLimit, handleChangePage, limit, page } = usePagination({
    limit: 12,
    page: 1,
  });
  const {
    coupons,
    isSuccessCoupons,
    isPendingCoupons,
    couponsError,
    isErrorCoupons,
  } = useGetCoupons(undefined, page, limit);
  const {
    anchorOrigin,
    handleCloseSnackbar,
    handleOpenSnackbar,
    openSnackbar,
    translatedToast,
    autoHideDuration,
  } = useSnackbar();
  const { deleteCoupon, isPendingDeleteCoupon } = useDeleteCoupon();
  const router = useRouter();

  const handleDeleteCoupon = useCallback(
    async (coupon) => {
      try {
        await deleteCoupon(coupon.id);
        handleOpenSnackbar({
          message: translatedToast.deleteMsg.replace("@", `#${coupon.name}`),
        });
      } catch (error) {
        handleOpenSnackbar({
          message: translatedToast.errorMsg,
          security: "error",
        });
        console.error(error);
      }
    },
    [deleteCoupon, handleOpenSnackbar, translatedToast]
  );

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
          {/* loading indicator */}
          {isPendingCoupons && <LinearProgress />}
          {/* end loading indicator */}
          {/* Coupon Grid View */}
          <Grid
              width={"100%"}
              component="ul"
              padding={0}
              container
              spacing={"1rem"}
              marginTop={"1rem"}
          >
            {isSuccessCoupons &&
              coupons.paginatedList.map((coupon) => (
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

                      sx={{width:"100%"}}
                      coupon={coupon}
                      isDeleting={isPendingDeleteCoupon}
                      onDelete={() => handleDeleteCoupon(coupon)}
                      onUpdate={() => handleUpdateCoupon(coupon)}
                    />
                  </Grid>
              ))}
          </Grid>
          <Paper sx={{ width: "100%", padding: "1rem", marginTop: "2rem" }}>
            <Pagination
              count={coupons?.totalPages || 0}
              onChange={onPageChange}
              color={"primary"}
              sx={{ width: "100%" }}
            />
          </Paper>
          {/* End Coupon Grid View */}
          {/* Coupon Error */}
          {!isPendingCoupons && isErrorCoupons && (
            <Alert severity="warning">
              <AlertTitle>
                {noFoundResources.title.replace(
                  "{resourceName}",
                  currentLang === "en" ? "coupon" : "كوبونات"
                )}
              </AlertTitle>
              {noFoundResources.message.replace(
                "{resourceName}",
                currentLang === "en" ? "coupon" : "الكوبونات"
              )}
            </Alert>
          )}
          {/* End Coupon Error */}
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
