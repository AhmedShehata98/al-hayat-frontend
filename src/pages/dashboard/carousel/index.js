import React from "react";
import { Layout as DashboardLayout } from "../../../layouts/dashboard";
import Head from "next/head";
import {
  Box,
  Breadcrumbs,
  Container,
  Grid,
  Link,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { BreadcrumbsSeparator } from "../../../components/breadcrumbs-separator";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import NextLink from "next/link";
import { paths } from "../../../paths";
import CarouselCard from "../../../sections/dashboard/carousel/CarouselCard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { minioService } from "../../../api/minio";
import { nanoid } from "@reduxjs/toolkit";
import { useRecoilValue } from "recoil";
import { authAtom } from "../../../atoms/auth-atom";
import { prefixImageUrl } from "../../../utils/prefixImageUrl";
import { useTranslation } from "react-i18next";
import { tokens } from "../../../locales/tokens";
import CarouselAddForm from "../../../sections/dashboard/carousel/CarouselAddForm";
import toast from "react-hot-toast";

const CarouselPage = () => {
  const { token } = useRecoilValue(authAtom);
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { mutateAsync: addCarouselAsync, isPending: isAddingCarousel } =
    useMutation({
      mutationFn: (image) =>
        minioService.uploadCarouselImage({
          token,
          image,
        }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["carousel"] });
        toast.success(t(tokens.carousel.messages.uploadSuccess), {
          duration: 3000,
        });
      },
    });

  const { data } = useQuery({
    queryKey: ["carousel", token],
    queryFn: () => minioService.getAllCarouselImages({ token }),
  });

  const handleSubmit = async (data, cb = (isUploaded) => {}) => {
    const { image } = data;

    const fd = new FormData();
    fd.append("image", image);

    try {
      await addCarouselAsync(fd, {
        onError: cb(false),
        onSuccess: cb(true),
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Head>Dashboard : Carousel List</Head>
      <Container maxWidth="xl">
        <Stack spacing={4}>
          <Stack direction="row" justifyContent="space-between" spacing={4}>
            <Stack spacing={1}>
              <Typography variant="h4">
                {t(tokens.carousel.heading.title)}
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
                  {t(tokens.carousel.heading.title)}
                </Typography>
              </Breadcrumbs>
            </Stack>
            <Stack alignItems="center" direction="row" spacing={3}>
              <LoadingButton
                component={NextLink}
                href={paths.dashboard.categories.create}
                startIcon={
                  <SvgIcon>
                    <PlusIcon />
                  </SvgIcon>
                }
                variant="contained"
              >
                {t(tokens.carousel.heading.ctaBtn)}
              </LoadingButton>
            </Stack>
          </Stack>
        </Stack>
        {/* Start carousel List */}
        <Grid
          component="ul"
          padding={0}
          container
          spacing={"1rem"}
          marginTop={"1rem"}
        >
          {data?.result?.length >= 1 &&
            data?.result?.map((item, index) => (
              <Grid
                key={index}
                sx={{ listStyleType: "none" }}
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
              >
                <CarouselCard
                  data={{
                    id: nanoid(6),
                    imageSrc: prefixImageUrl(item),
                  }}
                />
              </Grid>
            ))}
          {data?.result?.length <= 0 && (
            <Box
              sx={{
                padding: "1.5rem",
                marginTop: "3rem",
                marginBottom: "3.5rem",
                backgroundColor: "#F87A5370",
                borderRadius: "8px",
                width: "100%",
                color: "#181818",
              }}
            >
              <Typography variant="h6" textAlign="center">
                {t(tokens.carousel.messages.noImages)}
              </Typography>
            </Box>
          )}
          <Grid
            sx={{ listStyleType: "none" }}
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
          >
            <CarouselAddForm
              onSend={handleSubmit}
              isAdding={isAddingCarousel}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default CarouselPage;
CarouselPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
