import Head from "next/head";
import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { usePageView } from "../../hooks/use-page-view";
import { Layout as DashboardLayout } from "../../layouts/dashboard";
import OverviewOrders from "../../sections/dashboard/overview/overview-orders";
import useTranslateStatistics from "../../hooks/use-translate-statistics";
import useAppSettings from "../../hooks/use-app-settings";
import { getCookie } from "cookies-next";
import { PISTON_PRIVATE_INSTANCE } from "../../api";

const Page = () => {
  const { settings } = useAppSettings();
  const { translatedStatistics } = useTranslateStatistics();
  const token = getCookie("token");
  PISTON_PRIVATE_INSTANCE.defaults.headers.common.Authorization = token;

  usePageView();

  return (
    <>
      <Head>
        <title>Dashboard: Overview | Devias Kit PRO</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={settings.stretch ? false : "xl"}>
          <Grid
            container
            disableEqualOverflow
            spacing={{
              xs: 3,
              lg: 4,
            }}
          >
            <Grid xs={12}>
              <Stack direction="row" justifyContent="space-between" spacing={4}>
                <div>
                  <Typography variant="h4">
                    {translatedStatistics.headingTitle}
                  </Typography>
                </div>
                <div>
                  <Stack direction="row" spacing={4}></Stack>
                </div>
              </Stack>
            </Grid>
            <OverviewOrders />
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
