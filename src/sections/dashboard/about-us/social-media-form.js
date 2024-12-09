import {
  Card,
  CardContent,
  Grid,
  Stack,
  TextField,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { Textarea } from "../../../components/text-area";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { tokens } from "../../../locales/tokens";
import ReactPlayer from "react-player";
import { LoadingButton } from "@mui/lab";

const TEXT_FORCE_FOCUSED_STYLES = (fieldValue) => ({
  "& :nth-child(1)": {
    color: "#5f5f5f !important",
    top: fieldValue ? "-15px" : "0",
  },
  "& :empty": { bgColor: "red !important" },
  "& :nth-child(2)": {
    borderColor: "#a6a6a6 !important",
    boxShadow: "#a6a6a6 0 0 0 2px !important",
  },
});

function SocialMediaForm(props) {
  const { initialValues, editMode, onSend, onEdit, onSaveChanges, isLoading } =
    props;

  const { t } = useTranslation();

  const {
    errors,
    touched,
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    submitForm,
    resetForm,
  } = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values, helpers) => {
      // Handle form submission

      const formData = {
        aboutUrl: values.aboutUrl,
        whoAreWe: values.descriptionText,
        socialMedia: {
          ["youtube"]: values.youtubeUrl,
          ["whatsapp"]: values.whatsappNumber,
          ["twitter"]: values.twitterUrl,
          ["tiktok"]: values.tiktokUrl,
          ["instagram"]: values.instagramUrl,
          ["facebook"]: values.facebookUrl,
          ["linkedin"]: values.linkedinUrl,
        },
      };

      onSend(formData);
    },
    validationSchema: Yup.object({
      aboutUrl: Yup.string().url("Invalid URL"),
      youtubeUrl: Yup.string().url("Invalid URL"),
      whatsappNumber: Yup.string(),
      facebookUrl: Yup.string().url("Invalid URL"),
      twitterUrl: Yup.string().url("Invalid URL"),
      tiktokUrl: Yup.string().url("Invalid URL"),
      linkedinUrl: Yup.string().url("Invalid URL"),
      instagramUrl: Yup.string().url("Invalid URL"),
      descriptionText: Yup.string().required(
        "description text URL is required"
      ),
    }),
    validateOnBlur: true,
    validateOnChange: true,
    // enableReinitialize: true, // Reset form values when initialValues change
  });

  console.log(errors);

  return (
    <form action="" onSubmit={handleSubmit}>
      <Stack spacing={4}>
        <Card>
          <CardContent>
            <Grid container spacing={3} mb={5}>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
                  {t(tokens.aboutUs.form.labels.youtube)}
                </Typography>
              </Grid>
              <Grid item xs={12} md={8}>
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: "1rem",
                  }}
                >
                  <ReactPlayer
                    url={values.youtubeUrl}
                    controls
                    light
                    muted
                    width={"100%"}
                    height={"468px"}
                  />
                  <TextField
                    error={!!(touched.youtubeUrl && errors.youtubeUrl)}
                    fullWidth
                    helperText={touched.youtubeUrl && errors.youtubeUrl}
                    label={t(tokens.aboutUs.form.labels.youtube)}
                    placeholder={t(tokens.aboutUs.form.placeholder.youtube)}
                    name="youtubeUrl"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="url"
                    value={values.youtubeUrl}
                    disabled={!editMode}
                    focused
                    sx={
                      !editMode
                        ? TEXT_FORCE_FOCUSED_STYLES(values.youtubeUrl)
                        : undefined
                    }
                  />
                </Stack>
              </Grid>
            </Grid>
            <Grid container spacing={3} mb={5}>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
                  {t(tokens.aboutUs.form.labels.aboutUrl)}
                </Typography>
              </Grid>
              <Grid item xs={12} md={8}>
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: "1rem",
                  }}
                >
                  <TextField
                    error={!!(touched.aboutUrl && errors.aboutUrl)}
                    fullWidth
                    helperText={touched.aboutUrl && errors.aboutUrl}
                    label={t(tokens.aboutUs.form.placeholder.aboutUrl)}
                    placeholder={t(tokens.aboutUs.form.labels.aboutUrl)}
                    name="aboutUrl"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="url"
                    value={values.aboutUrl}
                    disabled={!editMode}
                    focused
                    sx={
                      !editMode
                        ? TEXT_FORCE_FOCUSED_STYLES(values.aboutUrl)
                        : undefined
                    }
                  />
                </Stack>
              </Grid>
            </Grid>
            <Grid container spacing={3} mb={5}>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
                  {t(tokens.aboutUs.form.labels.facebook)}
                </Typography>
              </Grid>
              <Grid item xs={12} md={8}>
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: "1rem",
                  }}
                >
                  <TextField
                    error={!!(touched.facebookUrl && errors.facebookUrl)}
                    fullWidth
                    helperText={touched.facebookUrl && errors.facebookUrl}
                    label={t(tokens.aboutUs.form.placeholder.facebook)}
                    placeholder={t(tokens.aboutUs.form.labels.facebook)}
                    name="facebookUrl"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="url"
                    value={values.facebookUrl}
                    disabled={!editMode}
                    focused
                    sx={
                      !editMode
                        ? TEXT_FORCE_FOCUSED_STYLES(values.facebookUrl)
                        : undefined
                    }
                  />
                </Stack>
              </Grid>
            </Grid>
            <Grid container spacing={3} mb={5}>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
                  {t(tokens.aboutUs.form.labels.whatsappNumber)}
                </Typography>
              </Grid>
              <Grid item xs={12} md={8}>
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: "1rem",
                  }}
                >
                  <TextField
                    error={!!(touched.whatsappNumber && errors.whatsappNumber)}
                    fullWidth
                    helperText={touched.whatsappNumber && errors.whatsappNumber}
                    label={t(tokens.aboutUs.form.labels.whatsappNumber)}
                    placeholder={t(
                      tokens.aboutUs.form.placeholder.whatsappNumber
                    )}
                    name="whatsappNumber"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="tel"
                    value={values.whatsappNumber}
                    disabled={!editMode}
                    focused
                    sx={
                      !editMode
                        ? TEXT_FORCE_FOCUSED_STYLES(values.whatsappNumber)
                        : undefined
                    }
                  />
                </Stack>
              </Grid>
            </Grid>
            <Grid container spacing={3} mb={5}>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
                  {t(tokens.aboutUs.form.labels.twitter)}
                </Typography>
              </Grid>
              <Grid item xs={12} md={8}>
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: "1rem",
                  }}
                >
                  <TextField
                    error={!!(touched.twitterUrl && errors.twitterUrl)}
                    fullWidth
                    helperText={touched.twitterUrl && errors.twitterUrl}
                    label={t(tokens.aboutUs.form.labels.twitter)}
                    placeholder={t(tokens.aboutUs.form.placeholder.twitter)}
                    name="twitterUrl"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="url"
                    value={values.twitterUrl}
                    disabled={!editMode}
                    focused
                    sx={
                      !editMode
                        ? TEXT_FORCE_FOCUSED_STYLES(values.twitterUrl)
                        : undefined
                    }
                  />
                </Stack>
              </Grid>
            </Grid>
            <Grid container spacing={3} mb={5}>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
                  {t(tokens.aboutUs.form.labels.linkedin)}
                </Typography>
              </Grid>
              <Grid item xs={12} md={8}>
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: "1rem",
                  }}
                >
                  <TextField
                    error={!!(touched.linkedinUrl && errors.linkedinUrl)}
                    fullWidth
                    helperText={touched.linkedinUrl && errors.linkedinUrl}
                    label={t(tokens.aboutUs.form.labels.linkedin)}
                    placeholder={t(tokens.aboutUs.form.placeholder.linkedin)}
                    name="linkedinUrl"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="url"
                    value={values.linkedinUrl}
                    focused
                    sx={
                      !editMode
                        ? TEXT_FORCE_FOCUSED_STYLES(values.linkedinUrl)
                        : undefined
                    }
                    disabled={!editMode}
                  />
                </Stack>
              </Grid>
            </Grid>
            <Grid container spacing={3} mb={5}>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
                  {t(tokens.aboutUs.form.labels.instagram)}
                </Typography>
              </Grid>
              <Grid item xs={12} md={8}>
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: "1rem",
                  }}
                >
                  <TextField
                    error={!!(touched.instagramUrl && errors.instagramUrl)}
                    fullWidth
                    helperText={touched.instagramUrl && errors.instagramUrl}
                    label={t(tokens.aboutUs.form.labels.instagram)}
                    placeholder={t(tokens.aboutUs.form.placeholder.instagram)}
                    name="instagramUrl"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="url"
                    value={values.instagramUrl}
                    disabled={!editMode}
                    focused
                    sx={
                      !editMode
                        ? TEXT_FORCE_FOCUSED_STYLES(values.instagramUrl)
                        : undefined
                    }
                  />
                </Stack>
              </Grid>
            </Grid>
            <Grid container spacing={3} mb={5}>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
                  {t(tokens.aboutUs.form.labels.tiktok)}
                </Typography>
              </Grid>
              <Grid item xs={12} md={8}>
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: "1rem",
                  }}
                >
                  <TextField
                    error={!!(touched.tiktokUrl && errors.tiktokUrl)}
                    fullWidth
                    helperText={touched.tiktokUrl && errors.tiktokUrl}
                    label={t(tokens.aboutUs.form.labels.tiktok)}
                    placeholder={t(tokens.aboutUs.form.placeholder.tiktok)}
                    name="tiktokUrl"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="url"
                    value={values.tiktokUrl}
                    disabled={!editMode}
                    focused
                    sx={
                      !editMode
                        ? TEXT_FORCE_FOCUSED_STYLES(values.tiktokUrl)
                        : undefined
                    }
                  />
                </Stack>
              </Grid>
            </Grid>
            <Grid container spacing={3} mb={5}>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
                  {t(tokens.aboutUs.form.labels.descriptionText)}
                </Typography>
              </Grid>
              <Grid item xs={12} md={8}>
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: "1rem",
                  }}
                >
                  <Textarea
                    minRows={8}
                    error={
                      !!(touched.descriptionText && errors.descriptionText)
                    }
                    fullWidth
                    helperText={
                      touched.descriptionText && errors.descriptionText
                    }
                    aria-label={t(tokens.aboutUs.form.labels.descriptionText)}
                    label={t(tokens.aboutUs.form.labels.descriptionText)}
                    placeholder={t(
                      tokens.aboutUs.form.placeholder.descriptionText
                    )}
                    name="descriptionText"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="string"
                    value={values.descriptionText}
                    disabled={!editMode}
                  />
                  {touched.descriptionText && errors.descriptionText && (
                    <Typography variant="body1" color={"red"}>
                      {errors.descriptionText}
                    </Typography>
                  )}
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Stack direction="row" justifyContent="flex-end" spacing={4}>
          {editMode && (
            <LoadingButton
              variant="contained"
              type="submit"
              loading={isLoading}
              onClick={() => {
                onSaveChanges();
                submitForm();
              }}
              sx={{ paddingX: "2.5rem" }}
            >
              {t(tokens.aboutUs.submitBtn)}
            </LoadingButton>
          )}
          {!editMode && (
            <Button
              variant="contained"
              color="secondary"
              onClick={onEdit}
              sx={{ paddingX: "2.5rem" }}
            >
              {t(tokens.aboutUs.edit)}
            </Button>
          )}
        </Stack>
      </Stack>
    </form>
  );
}

export default SocialMediaForm;
