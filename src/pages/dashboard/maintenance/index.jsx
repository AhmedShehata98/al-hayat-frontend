import { Layout as DashboardLayout } from "../../../layouts/dashboard";
import Head from "next/head";
import {
  Alert,
  AlertTitle,
  Box,
  Breadcrumbs,
  Container,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { BreadcrumbsSeparator } from "../../../components/breadcrumbs-separator";
import { paths } from "../../../paths";
import NextLink from "next/link";
import { useTranslation } from "react-i18next";
import { tokens } from "../../../locales/tokens";
import MaintenanceRequestsCard from "../../../sections/dashboard/maintenance/MaintenanceRequestsCard";
import { useGetMaintenanceRequests } from "../../../hooks/use-maintenance";

function MaintenanceRequests() {
  const { t } = useTranslation();
  const {
    maintenanceRequests,
    isErrorMaintenanceRequests,
    isLoadingMaintenanceRequests,
    errorMaintenanceRequests,
  } = useGetMaintenanceRequests({ limit: 10, page: 1 });

  console.log(" errorMaintenanceRequests:", errorMaintenanceRequests);
  console.log(" isErrorMaintenanceRequests:", isErrorMaintenanceRequests);
  return (
    <>
      <Head>Dashboard : maintenance service</Head>
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
                  {t(tokens.maintenance.headingTitle)}
                </Typography>
                <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                  <Link
                    color="text.primary"
                    component={NextLink}
                    href={paths.dashboard.index}
                    variant="subtitle2"
                  >
                    {t(tokens.breadcrumbs.dashboard)}
                  </Link>
                  <Link
                    color="text.primary"
                    component={NextLink}
                    href={paths.dashboard.maintenance.index}
                    variant="subtitle2"
                  >
                    {t(tokens.maintenance.headingTitle)}
                  </Link>
                </Breadcrumbs>
              </Stack>
              {/* <Stack alignItems="center" direction="row" spacing={3}>
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
                  {t(tokens.maintenance)}
                </Button>
              </Stack> */}
            </Stack>
          </Stack>
          <Stack
            sx={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 3,
              marginTop: 7,
              "@media screen and (min-width: 540px)": {
                gridTemplateColumns: "1fr 1fr",
              },
              "@media screen and (min-width: 768px)": {
                gridTemplateColumns: "1fr 1fr 1fr",
              },
              "@media screen and (min-width: 992px)": {
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
              },
              "@media screen and (min-width: 1280px)": {
                gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
              },
            }}
          >
            {maintenanceRequests &&
              maintenanceRequests.success &&
              maintenanceRequests.contentList.map((request) => (
                <MaintenanceRequestsCard key={request.id} data={request} />
              ))}
            {isErrorMaintenanceRequests && (
              <Alert
                severity={
                  errorMaintenanceRequests.status === 404 ? "warning" : "error"
                }
                sx={{ width: "100%" }}
              >
                <AlertTitle>
                  {errorMaintenanceRequests.status === 404
                    ? t(tokens.networkMessages.noFoundResources.title).replace(
                        "{resourceName}",
                        t(tokens.maintenance.headingTitle)
                      )
                    : t(tokens.networkMessages.somethingWentWrong.title)}
                </AlertTitle>
              </Alert>
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
}

export default MaintenanceRequests;

MaintenanceRequests.getLayout = (page) => (
  <DashboardLayout>{page}</DashboardLayout>
);
