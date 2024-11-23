import { Layout as DashboardLayout } from "../../../layouts/dashboard";
import Head from "next/head.d.ts";
import {
  Box,
  Breadcrumbs,
  Container,
  Link,
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

  const handleEdit = () => {
    setEditMode(true);
  };
  const handleSaveChanges = async () => {
    setEditMode(false);
  };

  const handleCreateAboutUrls = useCallback(
    async (data) => {
      const addedData = await addAboutUsAsync(data);
    },
    [addAboutUsAsync]
  );

  const handleUpdateAboutUrls = useCallback(
    async (data) => {
      const newData = {
        aboutUrl: aboutUsData.aboutUrl,
        whoAreWe: aboutUsData.whoAreWe,
        data,
        socialMedia: { ...aboutUsData.socialMedia, ...data.socialMedia },
      };

      const addedData = await addAboutUsAsync(newData);
    },
    [aboutUsData, addAboutUsAsync]
  );

  const handleSubmit = useCallback(
    async (data) => {
      console.log(data);
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
        const addedData = await addAboutUsAsync(data);
        queryClient.invalidateQueries(["about-us"]);
      } catch (error) {
        console.error(data);
      }
    },
    [
      addAboutUsAsync,
      handleUpdateAboutUrls,
      handleCreateAboutUrls,
      aboutUsData,
      queryClient,
    ]
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
    </>
  );
};

AboutUsPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default AboutUsPage;
