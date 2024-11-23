import { Layout as DashboardLayout } from "../../../layouts/dashboard";
import Head from "next/head.d.ts";
import {
  Box,
  Breadcrumbs,
  Container,
  Link,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import { BreadcrumbsSeparator } from "../../../components/breadcrumbs-separator.js";
import { paths } from "../../../paths.js";
import NextLink from "next/link";
import { useTranslation } from "react-i18next";
import { tokens } from "../../../locales/tokens.js";
import TinyMceEditor from "../../../components/tinymce-wrapper/TinyMceEditor.js";

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>Dashboard: Privacy Policy | Devias Kit PRO</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={4}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">
                  {t(tokens.policyPrivacy.headingTitle)}
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
                  <Typography
                    color="text.primary"
                    // component={NextLink}
                    // href={paths.dashboard.products.index}
                    variant="subtitle2"
                  >
                    {t(tokens.breadcrumbs.termsAndCondition)}
                  </Typography>
                  <Typography color="text.secondary" variant="subtitle2">
                    {t(tokens.policyPrivacy.headingTitle)}
                  </Typography>
                </Breadcrumbs>
              </Stack>
              <Stack alignItems="center" direction="row" spacing={3}></Stack>
            </Stack>
            <TinyMceEditor initialValue="<script>alert(1);</script>" />
            <Box>
              <Button variant="contained">
                {t(tokens.termsOfUse.submitBtn)}
              </Button>
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

PrivacyPolicy.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default PrivacyPolicy;
