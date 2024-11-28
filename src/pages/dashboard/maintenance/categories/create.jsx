"use client";
import {
  Box,
  Breadcrumbs,
  Container,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import Head from "next/head";
import React, { useMemo } from "react";
import { BreadcrumbsSeparator } from "../../../../components/breadcrumbs-separator";
import { paths } from "../../../../paths";
import { t } from "i18next";
import { tokens } from "../../../../locales/tokens";
import NextLink from "next/link";
import MaintenanceCategoryForm from "../../../../sections/dashboard/maintenance/MaintenanceCategoryForm";
import { Layout as DashboardLayout } from "../../../../layouts/dashboard";
import { maintenanceServicesAtom } from "../../../../atoms/maintenance-services-atom";
import { useRecoilValue } from "recoil";

const CreateMaintenancePage = () => {
  const maintenanceServicesState = useRecoilValue(maintenanceServicesAtom);
  const initialValues = useMemo(
    () => ({
      name: maintenanceServicesState?.name || "",
      subCategoriesList: maintenanceServicesState?.subRepairs || [],
      image: maintenanceServicesState?.image || "",
    }),
    [maintenanceServicesState]
  );

  console.log(maintenanceServicesState);
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
                    {t(tokens.maintenanceCategoriesCreate.headingTitle)}
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

                    <Typography color="text.secondary" variant="subtitle2">
                      {t(tokens.maintenanceCategoriesCreate.headingTitle)}
                    </Typography>
                  </Breadcrumbs>
                </Stack>
              </Stack>
            </Stack>
            {/*End Heading */}
            {/* start category form */}
            <MaintenanceCategoryForm initialValues={initialValues} />
            {/* end category create form */}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default CreateMaintenancePage;
CreateMaintenancePage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
