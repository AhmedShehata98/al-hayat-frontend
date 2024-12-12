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
  const termsOfPrivacyAndUseRef = useRef();
  const termsOfBuyAndSellRef = useRef();
  const { data } = useQuery({
    queryKey: ["terms-of-use", token],
    queryFn: () => termsAndConditionsService.termsAndPolicy({ token }),
  });

  const { mutateAsync: addTermsAndPolicyAsync } = useMutation({
    mutationFn: (data) =>
      termsAndConditionsService.addTermsAndPolicy({ token, data }),
    onSuccess: () => {
      queryClient.invalidateQueries(["terms-of-use"]);
    },
  });

  const { mutateAsync: updateTermsAndPolicyAsync } = useMutation({
    mutationFn: (data) =>
      termsAndConditionsService.updateTermsAndPolicy({ token, data }),
    onSuccess: () => {
      queryClient.invalidateQueries(["terms-of-use"]);
    },
  });

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCreatePolicy = useCallback(
    async (policy) => {
      await addTermsAndPolicyAsync(policy);
    },
    [addTermsAndPolicyAsync]
  );

  const handleUpdatePolicy = useCallback(
    async (policy) => {
      const newPolicy = {
        usageAndPrivacyPolicy: data.usageAndPrivacyPolicy,
        buyingAndSelling: termsOfBuyAndSellRef.buyingAndSelling,
        ...policy,
      };
      await addTermsAndPolicyAsync(newPolicy);
    },
    [data, addTermsAndPolicyAsync]
  );

  const handleSaveChanges = useCallback(async () => {
    const policy = {
      usageAndPrivacyPolicy: termsOfPrivacyAndUseRef.current,
      buyingAndSelling: termsOfBuyAndSellRef.current,
    };
    const isExistingData = data?.every(
      (item) => item.buyingAndSelling && item.usageAndPrivacyPolicy
    );

    try {
      if (isExistingData) {
        await handleUpdatePolicy(policy);
      } else {
        await handleCreatePolicy(policy);
      }
      setEditMode(false);
    } catch (error) {
      console.error(error);
      toast.error(t(tokens.networkMessages.somethingWentWrong.message));
    }
  }, [
    handleUpdatePolicy,
    handleCreatePolicy,
    t,
    termsOfPrivacyAndUseRef.current,
    termsOfBuyAndSellRef.current,
    data,
  ]);

  return (
    <>
      <Head>
        <title>Dashboard: terms and conditions | Devias Kit PRO</title>
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
              initialValue={
                data?.[data?.length - 1]?.usageAndPrivacyPolicy || ""
              }
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
              initialValue={data?.[data?.length - 1]?.buyingAndSelling || ""}
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
    </>
  );
};

TermsOfUse.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default TermsOfUse;
