import React from "react";
import { Layout as DashboardLayout } from "../../../../layouts/dashboard";
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  LinearProgress,
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
import {
  useChangeMaintenanceStatus,
  useGetMaintenanceRequestDetails,
} from "../../../../hooks/use-maintenance";
import { usePathname } from "next/navigation";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import dynamic from "next/dynamic";

const MapContainer = dynamic(
  async () => (await import("react-leaflet/MapContainer")).MapContainer,
  {
    ssr: false,
  }
);
const LeafletMap = dynamic(
  async () => await import("../../../../components/leaflet-maps/LeafletMap"),
  { ssr: false }
);

function MaintenanceRequestDetailsPage(props) {
  const pathname = usePathname();
  const id = pathname?.split("/").pop();

  const { formatDate, formatOnlyDate } = useFormatDate();
  const { maintenanceRequestDetails, isLoadingMaintenanceRequestDetails } =
    useGetMaintenanceRequestDetails(id);
  const { changeStatusAsync, isPendingChangeStatus } =
    useChangeMaintenanceStatus();

  const createdAt = formatDate(
    maintenanceRequestDetails.createdAt || new Date()
  );
  const requestAddress = `${maintenanceRequestDetails?.contentList?.address.postalCode} -${maintenanceRequestDetails?.contentList?.address.city} ${maintenanceRequestDetails?.contentList?.address.country}`;
  const geolocation = {
    lat: maintenanceRequestDetails?.contentList?.address.latitude || 30.0136,
    lng: maintenanceRequestDetails?.contentList?.address.longitude || 31.2081,
  };

  const requestStatusColors = (status) => {
    switch (status) {
      case "pending":
        return {
          color: "#161616",
          backgroundColor: "#ffb300dc",
        };
      case "declined":
        return {
          color: "#fff",
          backgroundColor: "#FF2929dc",
        };
      case "accepted":
        return {
          color: "#fff",
          backgroundColor: "#117554dc",
        };
      default:
        return {
          color: "#161616",
          backgroundColor: "#FFB200dc",
        };
    }
  };

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
            {isLoadingMaintenanceRequestDetails ? (
              <Box sx={{ width: "100%" }}>
                <LinearProgress />
              </Box>
            ) : (
              <>
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
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button
                        color="secondary"
                        sx={{
                          borderRadius: "6px",
                        }}
                        variant="contained"
                        startIcon={<DoDisturbIcon />}
                        onClick={() => {
                          if (
                            maintenanceRequestDetails?.contentList.status ===
                              "Declined" ||
                            maintenanceRequestDetails?.contentList.status ===
                              "Accepted"
                          )
                            return;
                          changeStatusAsync({
                            status: "Declined",
                            maintenanceId: id,
                          });
                        }}
                        disabled={
                          maintenanceRequestDetails?.contentList.status ===
                            "Declined" ||
                          maintenanceRequestDetails?.contentList.status ===
                            "Accepted"
                        }
                      >
                        {t(tokens.maintenanceDetails.rejectionRequestBtn)}
                      </Button>
                      <Button
                        color="primary"
                        sx={{
                          opacity:
                            maintenanceRequestDetails?.contentList.status ===
                              "Declined" ||
                            maintenanceRequestDetails?.contentList.status ===
                              "Accepted"
                              ? "0.3"
                              : "1",
                          borderRadius: "6px",
                        }}
                        variant="contained"
                        startIcon={<DoneAllIcon />}
                        onClick={() => {
                          if (
                            maintenanceRequestDetails?.contentList.status ===
                              "Declined" ||
                            maintenanceRequestDetails?.contentList.status ===
                              "Accepted"
                          )
                            return;
                          changeStatusAsync({
                            status: "Accepted",
                            maintenanceId: id,
                          });
                        }}
                        disabled={
                          maintenanceRequestDetails?.contentList.status ===
                            "Declined" ||
                          maintenanceRequestDetails?.contentList.status ===
                            "Accepted"
                        }
                      >
                        {t(tokens.maintenanceDetails.acceptRequestBtn)}
                      </Button>
                    </Box>
                  </Stack>
                </div>
                {maintenanceRequestDetails && (
                  <ServiceSummeryWrapper
                    title={t(tokens.maintenance.basicInfoHeading)}
                  >
                    <SummeryItem
                      label={t(
                        tokens.maintenanceDetails.propertiesList.customer
                      )}
                      value={maintenanceRequestDetails?.contentList?.user.name}
                    />
                    <SummeryItem
                      label={t(
                        tokens.maintenanceDetails.propertiesList.description
                      )}
                      value={
                        maintenanceRequestDetails?.contentList?.description
                      }
                    />
                    <SummeryItem
                      label={t(
                        tokens.maintenanceDetails.propertiesList
                          .maintenanceService
                      )}
                      value={
                        maintenanceRequestDetails?.contentList
                          ?.repairingServiceName
                      }
                    />
                    <SummeryItem
                      label={t(
                        tokens.maintenanceDetails.propertiesList.maintenanceType
                      )}
                      value={maintenanceRequestDetails?.contentList?.subRepair}
                    />
                    <SummeryItem
                      label={t(
                        tokens.maintenanceDetails.propertiesList.warranty
                      )}
                      value={t(
                        tokens.maintenanceDetails.propertiesList.warrantyStatus[
                          maintenanceRequestDetails?.contentList?.isWarranty
                            ? "isValid"
                            : "isExpired"
                        ]
                      )}
                    />
                    <SummeryItem
                      label={t(tokens.maintenanceDetails.propertiesList.id)}
                      value={
                        maintenanceRequestDetails?.contentList
                          ?.customerRequestNumber
                      }
                    />
                    <SummeryItem
                      label={t(
                        tokens.maintenanceDetails.propertiesList.location
                      )}
                      value={requestAddress}
                    />
                    <SummeryItem
                      label={t(
                        tokens.maintenanceDetails.propertiesList.visitDate
                      )}
                      value={formatOnlyDate(
                        maintenanceRequestDetails?.contentList?.visitDate ||
                          new Date()
                      )}
                    />
                    <SummeryItem
                      label={t(
                        tokens.maintenanceDetails.propertiesList.visitTime
                      )}
                      value={maintenanceRequestDetails?.contentList?.visitTime}
                    />
                    <SummeryItem
                      label={t(
                        tokens.maintenanceDetails.propertiesList
                          .maintenanceStatus.title
                      )}
                      value={
                        <Box
                          sx={{
                            width: "fit-content",
                            px: "1.75rem",
                            py: "0.7rem",
                            bgcolor: requestStatusColors(
                              maintenanceRequestDetails?.contentList?.status?.toLowerCase()
                            ).backgroundColor,

                            fontWeight: "bold",
                            fontSize: 14,
                            borderRadius: "8px",
                            textTransform: "capitalize",
                          }}
                        >
                          <Typography
                            sx={{
                              color: requestStatusColors(
                                maintenanceRequestDetails?.contentList?.status?.toLowerCase()
                              ).color,
                            }}
                          >
                            {t(
                              tokens.maintenanceDetails.propertiesList
                                .maintenanceStatus[
                                maintenanceRequestDetails?.contentList?.status?.toLowerCase()
                              ]
                            )}
                          </Typography>
                        </Box>
                      }
                    />
                  </ServiceSummeryWrapper>
                )}

                <Stack
                  sx={{
                    width: "100%",
                    height: "478px",
                    boxShadow: "-2px 2px 4px 0px rgb(0 0 0 / 8%)",

                    "&:hover": {
                      boxShadow: "-2px 2px 8px 0px rgb(0 0 0 / 20%)",
                    },
                  }}
                >
                  <MapContainer
                    center={Object.values(geolocation)}
                    zoom={10}
                    scrollWheelZoom={true}
                    style={{
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    <LeafletMap center={Object.values(geolocation)} />
                  </MapContainer>
                </Stack>
              </>
            )}
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
