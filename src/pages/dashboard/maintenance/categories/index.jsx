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
import React, { useState } from "react";
import { tokens } from "../../../../locales/tokens";
import { paths } from "../../../../paths";
import { BreadcrumbsSeparator } from "../../../../components/breadcrumbs-separator";
import NextLink from "next/link";
import { useTranslation } from "react-i18next";
import { Layout as DashboardLayout } from "../../../../layouts/dashboard";
import MaintenanceCategoryCard from "../../../../components/MaintenanceCategoryCard";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import { useGetMaintenanceServices } from "../../../../hooks/use-maintenance";
import { useSearchParams } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { maintenanceServicesAtom } from "../../../../atoms/maintenance-services-atom";

const ServiceCategory = () => {
  const { t } = useTranslation();
  const selectedServiceId = useState(null);
  const setSelectedServiceState = useSetRecoilState(maintenanceServicesAtom);
  const { maintenanceServices } = useGetMaintenanceServices({
    limit: 10,
    page: 1,
  });

  return (
    <>
      <Head>Dashboard : maintenance categories</Head>
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
                  {t(tokens.maintenanceCategories.headingTitle)}
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
                    href={paths.dashboard.maintenance.category}
                    variant="subtitle2"
                  >
                    {t(tokens.maintenanceCategories.headingTitle)}
                  </Link>
                </Breadcrumbs>
              </Stack>
              <Stack alignItems="center" direction="row" spacing={3}>
                <Button
                  component={NextLink}
                  href={paths.dashboard.maintenance.createCategory}
                  startIcon={
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  {t(tokens.common.addBtn)}
                </Button>
              </Stack>
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
              "@media screen and (min-width: 1330px)": {
                gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
              },
            }}
          >
            {maintenanceServices &&
              maintenanceServices.contentList.map((service, idx) => (
                <MaintenanceCategoryCard
                  key={idx}
                  service={service}
                  onUpdate={() => setSelectedServiceState(service)}
                />
              ))}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default ServiceCategory;
ServiceCategory.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
