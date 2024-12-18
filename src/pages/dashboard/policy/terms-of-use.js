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
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import { BreadcrumbsSeparator } from "../../../components/breadcrumbs-separator.js";
import { paths } from "../../../paths.js";
import NextLink from "next/link";
import { useTranslation } from "react-i18next";
import { tokens } from "../../../locales/tokens.js";
import { useCallback, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { termsAndConditionsService } from "../../../api/terms-and-policy";
import { useRecoilValue } from "recoil";
import { authAtom } from "../../../atoms/auth-atom.js";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import useSnackbar from "../../../hooks/use-snackbar.js";
const TinyMceEditor = dynamic(
  () => import("../../../components/tinymce-wrapper/TinyMceEditor.js"),
  { ssr: false }
);
// import { TinyMceEditor } from "../../../components/TinyMceEditor.js";

const TermsOfUse = () => {
  const { t } = useTranslation();
  const [editMode, setEditMode] = useState(false);
  const queryClient = useQueryClient();
  const { token } = useRecoilValue(authAtom);
  const termsOfPrivacyAndUseRef = useRef(null);
  const termsOfBuyAndSellRef = useRef(null);
  const { data: policy } = useQuery({
    queryKey: ["terms-of-use", token],
    select: (data) => data?.[0],
    queryFn: () => termsAndConditionsService.termsAndPolicy({ token }),
  });
  const {
    anchorOrigin,
    autoHideDuration,
    handleCloseSnackbar,
    handleOpenSnackbar,
    openSnackbar,
    translatedToast,
  } = useSnackbar();
  const { mutateAsync: addTermsAndPolicyAsync } = useMutation({
    mutationFn: (data) =>
      termsAndConditionsService.addTermsAndPolicy({ token, data }),
    onSuccess: () => {
      queryClient.invalidateQueries(["terms-of-use"]);
      termsOfPrivacyAndUseRef.current = null;
      termsOfBuyAndSellRef.current = null;
    },
  });

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSaveChanges = useCallback(async () => {
    const newPolicy = {
      usageAndPrivacyPolicy:
        termsOfPrivacyAndUseRef.current || policy.usageAndPrivacyPolicy,
      buyingAndSelling: termsOfBuyAndSellRef.current || policy.buyingAndSelling,
    };

    try {
      await addTermsAndPolicyAsync(newPolicy);
      setEditMode(false);
      handleOpenSnackbar({
        message: translatedToast.updateMsg.replace(
          "@",
          t(tokens.policyPrivacy.headingTitle)
        ),
        severity: "success",
      });
    } catch (error) {
      console.error(error);
      handleOpenSnackbar({
        message: t(tokens.networkMessages.somethingWentWrong.message),
        severity: "success",
      });
    }
  }, [
    addTermsAndPolicyAsync,
    t,
    handleOpenSnackbar,
    termsOfPrivacyAndUseRef.current,
    termsOfBuyAndSellRef.current,
    policy,
  ]);

  return (
    <>
      <Head>
        <title>Dashboard: terms and conditions | Al-hayah </title>
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
              {/* Heading */}
              <Stack spacing={1}>
                <Typography variant="h4">
                  {t(tokens.termsOfUse.headingTitle)}
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
                    {t(tokens.termsOfUse.headingTitle)}
                  </Typography>
                </Breadcrumbs>
              </Stack>
              <Stack alignItems="center" direction="row" spacing={3}></Stack>
              {/* End Heading */}
            </Stack>
            <Typography
              variant="h5"
              color={"primary"}
              marginTop={12}
              display={"block"}
            >
              {t(tokens.termsOfUse.privacyAndUsePolicyHeading)}
            </Typography>
            <Divider />
            <TinyMceEditor
              initialValue={policy?.usageAndPrivacyPolicy || ""}
              disabled={!editMode}
              onDataChange={(newValue) => {
                termsOfPrivacyAndUseRef.current = newValue;
              }}
            />
            <Typography
              variant="h5"
              color={"primary"}
              marginTop={12}
              display={"block"}
            >
              {t(tokens.termsOfUse.buyingAndSellTermsHeading)}
            </Typography>
            <TinyMceEditor
              initialValue={policy?.buyingAndSelling || ""}
              disabled={!editMode}
              onDataChange={(newValue) => {
                termsOfBuyAndSellRef.current = newValue;
              }}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              {editMode && (
                <Button variant="contained" onClick={handleSaveChanges}>
                  {t(tokens.termsOfUse.submitBtn)}
                </Button>
              )}
              {!editMode && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleEdit}
                  sx={{ paddingX: "2.5rem" }}
                >
                  {t(tokens.termsOfUse.editBtn)}
                </Button>
              )}
            </Box>
          </Stack>
        </Container>
      </Box>
      <Snackbar
        open={openSnackbar.open}
        autoHideDuration={autoHideDuration}
        anchorOrigin={anchorOrigin}
        onClose={handleCloseSnackbar}
      >
        <Alert severity={openSnackbar.severity}>{openSnackbar.message}</Alert>
      </Snackbar>
    </>
  );
};

TermsOfUse.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default TermsOfUse;
