import React from "react";
import { Layout as DashboardLayout } from "../../../../layouts/dashboard";
import {
  Box,
  Breadcrumbs,
  Container,
  Link,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { paths } from "../../../../paths";
import { t } from "i18next";
import { tokens } from "../../../../locales/tokens";
import useFormatDate from "../../../../hooks/use-date.format";
import NextLink from "next/link";
import Head from "next/head";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import CalendarIcon from "@untitled-ui/icons-react/build/esm/Calendar";
import ServiceSummeryWrapper from "../../../../sections/dashboard/maintenance/request-service-details/ServiceSummeryWrapper";
import SummeryItem from "../../../../sections/dashboard/maintenance/request-service-details/SummeryItem";
import { useQuery } from "@tanstack/react-query";
import { maintenanceService } from "../../../../api/maintaine-services";
import { useGetMaintenanceRequestDetails } from "../../../../hooks/use-maintenance";
import { usePathname } from "next/navigation";

function MaintenanceRequestDetailsPage(props) {
  const pathname = usePathname();
  const id = pathname?.split("/").pop();

  const { formatDate } = useFormatDate();
  const { maintenanceRequestDetails } = useGetMaintenanceRequestDetails(id);

  console.log("maintenanceRequestDetails :", maintenanceRequestDetails);

  const createdAt = formatDate(new Date());
  return (
    <>
      <Head>
        <title>Dashboard: Request Details </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={4}>
            <div>
              <Link
                color="text.primary"
                component={NextLink}
                href={paths.dashboard.maintenance.index}
                sx={{
                  alignItems: "center",
                  display: "inline-flex",
                }}
                underline="hover"
              >
                <SvgIcon sx={{ mr: 1 }}>
                  <ArrowLeftIcon />
                </SvgIcon>
                <Typography variant="subtitle2">
                  {t(tokens.maintenance.goBackBtn)}
                </Typography>
              </Link>
            </div>
            <div>
              <Stack
                alignItems="flex-start"
                direction="row"
                justifyContent="space-between"
                spacing={3}
              >
                <Stack spacing={1}>
                  <Typography variant="h4">#{id}</Typography>
                  <Stack alignItems="center" direction="row" spacing={1}>
                    <Typography color="text.secondary" variant="body2">
                      {t(tokens.maintenance.placedOn)}
                    </Typography>
                    <SvgIcon color="action">
                      <CalendarIcon />
                    </SvgIcon>
                    <Typography variant="body2">{createdAt}</Typography>
                  </Stack>
                </Stack>
              </Stack>
            </div>
            <ServiceSummeryWrapper
              title={t(tokens.maintenance.basicInfoHeading)}
            >
              <SummeryItem
                label={t(tokens.maintenanceDetails.propertiesList.customer)}
                value={"ahmed shehata"}
              />
              <SummeryItem
                label={t(tokens.maintenanceDetails.propertiesList.description)}
                value={maintenanceRequestDetails.contentList.description}
              />
              <SummeryItem
                label={t(
                  tokens.maintenanceDetails.propertiesList.maintenanceService
                )}
                value={
                  maintenanceRequestDetails.contentList.serviceCategory.name
                }
              />
              <SummeryItem
                label={t(
                  tokens.maintenanceDetails.propertiesList.maintenanceType
                )}
                value={
                  maintenanceRequestDetails.contentList.serviceCategory
                    ?.subCategory.name
                }
              />
              <SummeryItem
                label={t(tokens.maintenanceDetails.propertiesList.warranty)}
                value={t(
                  tokens.maintenanceDetails.propertiesList.warrantyStatus[
                    maintenanceRequestDetails.contentList.isWarranty
                      ? "isValid"
                      : "isExpired"
                  ]
                )}
              />
              <SummeryItem
                label={t(tokens.maintenanceDetails.propertiesList.id)}
                value={maintenanceRequestDetails.contentList.requestServiceId}
              />
              <SummeryItem
                label={t(tokens.maintenanceDetails.propertiesList.location)}
                value={"Isle of Man , Macedonia 45"}
              />
              <SummeryItem
                label={t(tokens.maintenanceDetails.propertiesList.visitDate)}
                value={formatDate(
                  maintenanceRequestDetails.contentList.visitDate
                )}
              />
              <SummeryItem
                label={t(tokens.maintenanceDetails.propertiesList.visitTime)}
                value={maintenanceRequestDetails.contentList.visitTime}
              />
              <SummeryItem
                label={t(
                  tokens.maintenanceDetails.propertiesList.maintenanceStatus
                    .title
                )}
                value={
                  <Box
                    sx={{
                      width: "fit-content",
                      bgcolor: "#f3cb038a",
                      px: "1.75rem",
                      py: "0.7rem",
                      color: "#000",
                      fontWeight: "bold",
                      fontSize: 14,
                      borderRadius: "8px",
                      textTransform: "capitalize",
                    }}
                  >
                    <Typography>pending</Typography>
                  </Box>
                }
              />
            </ServiceSummeryWrapper>
          </Stack>
        </Container>
      </Box>
    </>
  );
}

export default MaintenanceRequestDetailsPage;
MaintenanceRequestDetailsPage.getLayout = (page) => (
  <DashboardLayout>{page}</DashboardLayout>
);
