import { Layout as DashboardLayout } from "../../../layouts/dashboard";
import Head from "next/head.d.ts";
import {
  Alert,
  Box,
  Breadcrumbs,
  Container,
  Link,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { BreadcrumbsSeparator } from "../../../components/breadcrumbs-separator.js";
import { paths } from "../../../paths.js";
import NextLink from "next/link";
import { useTranslation } from "react-i18next";
import { tokens } from "../../../locales/tokens.js";
import SocialMediaForm from "../../../sections/dashboard/about-us/social-media-form.js";
import { useCallback, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { aboutUsService } from "../../../api/about-us/index";
import { useRecoilValue } from "recoil";
import { authAtom } from "../../../atoms/auth-atom.js";
import useSnackbar from "../../../hooks/use-snackbar.js";

const AboutUsPage = () => {
  const { t } = useTranslation();
  const [editMode, setEditMode] = useState(false);
  const { token } = useRecoilValue(authAtom);
  const queryClient = useQueryClient();
  const { data: aboutUsData } = useQuery({
    queryKey: ["about-us", token],
    queryFn: () => aboutUsService.getAllAboutUs({ token }),
  });
  const { mutateAsync: addAboutUsAsync, isPending: isAdding } = useMutation({
    mutationFn: (data) => aboutUsService.addAboutUs({ data, token }),
  });
  const {
    anchorOrigin,
    autoHideDuration,
    handleCloseSnackbar,
    handleOpenSnackbar,
    openSnackbar,
    translatedToast,
  } = useSnackbar();
  const handleEdit = () => {
    setEditMode(true);
  };
  const handleSaveChanges = async () => {
    setEditMode(false);
  };

  const handleCreateAboutUrls = useCallback(
    async (data) => {
      try {
        await addAboutUsAsync(data);
        handleOpenSnackbar({
          message: translatedToast.createMsg.replace(
            "@",
            t(tokens.aboutUs.headingTitle)
          ),
          severity: "success",
        });
      } catch (error) {
        handleOpenSnackbar({
          message: t(tokens.networkMessages.somethingWentWrong.message),
          severity: "success",
        });
        console.error("Error adding about us data: ", error);
      }
    },
    [addAboutUsAsync, handleOpenSnackbar]
  );

  const handleUpdateAboutUrls = useCallback(
    async (data) => {
      try {
        const newData = {
          aboutUrl: aboutUsData.aboutUrl,
          whoAreWe: aboutUsData.whoAreWe,
          data,
          socialMedia: { ...aboutUsData.socialMedia, ...data.socialMedia },
        };

        await addAboutUsAsync(newData);
        handleOpenSnackbar({
          message: translatedToast.updateMsg.replace(
            "@",
            t(tokens.aboutUs.headingTitle)
          ),
          severity: "success",
        });
      } catch (error) {
        handleOpenSnackbar({
          message: t(tokens.networkMessages.somethingWentWrong.message),
          severity: "success",
        });
        console.error("Error adding update us data: ", error);
      }
    },
    [aboutUsData, addAboutUsAsync, handleOpenSnackbar]
  );

  const handleSubmit = useCallback(
    async (data) => {
      try {
        const isExistingData =
          aboutUsData.whoAreWe &&
          aboutUsData.aboutUrl &&
          Object.keys(aboutUsData.socialMedia).length >= 1;

        if (isExistingData) {
          await handleUpdateAboutUrls(data);
        } else {
          await handleCreateAboutUrls(data);
        }

        queryClient.invalidateQueries(["about-us"]);
      } catch (error) {
        console.error(data);
      }
    },
    [handleUpdateAboutUrls, handleCreateAboutUrls, aboutUsData, queryClient]
  );

  return (
    <>
      <Head>
        <title>Dashboard: about-us | Devias Kit PRO</title>
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
                  {t(tokens.aboutUs.headingTitle)}
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
                    {t(tokens.aboutUs.headingTitle)}
                  </Typography>
                </Breadcrumbs>
              </Stack>
              <Stack alignItems="center" direction="row" spacing={3}></Stack>
            </Stack>

            <SocialMediaForm
              initialValues={{
                aboutUrl: aboutUsData?.aboutUrl,
                facebookUrl: aboutUsData?.socialMedia?.facebook,
                twitterUrl: aboutUsData?.socialMedia?.twitter,
                linkedinUrl: aboutUsData?.socialMedia?.linkedin,
                instagramUrl: aboutUsData?.socialMedia?.instagram,
                whatsappNumber: aboutUsData?.socialMedia?.whatsapp,
                tiktokUrl: aboutUsData?.socialMedia?.tiktok,
                youtubeUrl: aboutUsData?.socialMedia?.youtube,
                descriptionText: aboutUsData?.whoAreWe,
              }}
              editMode={editMode}
              onSend={handleSubmit}
              onSaveChanges={handleSaveChanges}
              onEdit={handleEdit}
              isLoading={isAdding}
            />
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

AboutUsPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default AboutUsPage;
