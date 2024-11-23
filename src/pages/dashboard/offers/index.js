import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Link,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import Head from "next/head";
import NextLink from "next/link";
import { Layout as DashboardLayout } from "../../../layouts/dashboard";
import { paths } from "../../../paths";
import { BreadcrumbsSeparator } from "../../../components/breadcrumbs-separator";
import DiscountsListTable from "../../../sections/dashboard/offers/discount-list-table";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import useTranslateDiscounts from "../../../hooks/use-translate-discounts";

const OffersList = () => {
  const {
    translateDiscounts: { breadcrumbs, headingTitle, ctaBtn },
  } = useTranslateDiscounts();
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
                <Typography variant="h4"> {headingTitle}</Typography>
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
                    {breadcrumbs.discounts}
                  </Typography>
                </Breadcrumbs>
              </Stack>
              <Stack alignItems="center" direction="row" spacing={3}>
                <Button
                  component={NextLink}
                  href={paths.dashboard.offers.createDiscount}
                  startIcon={
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  {ctaBtn}
                </Button>
              </Stack>
            </Stack>
          </Stack>
          {/*End Heading */}
          {/* Content Table */}
          <DiscountsListTable />
        </Container>
      </Box>
    </>
  );
};

OffersList.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default OffersList;
