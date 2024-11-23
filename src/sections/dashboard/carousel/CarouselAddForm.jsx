import { DeleteForever } from "@mui/icons-material";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useCallback } from "react";
import NextImage from "next/image";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const initialValues = {
  image: "",
};
function CarouselAddForm({ onSend, isAdding }) {
  const validationSchema = Yup.object({
    image: Yup.string().required("Image is required"),
  });

  const [fileBlob, setFileBlob] = React.useState(null);
  const [filePreview, setFilePreview] = React.useState(null);

  const handleChange = useCallback(
    (evt) => {
      const file = evt.target.files[0];
      if (!file) return;

      setFileBlob(file);
      formik.setFieldValue("image", file);

      const reader = new FileReader();
      reader.onload = function (event) {
        setFilePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    },
    [formik]
  );

  const handleReset = () => {
    formik.resetForm();
    setFileBlob(null);
    setFilePreview(null);
  };

  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit: (values) =>
      onSend(values, (isUploaded) => {
        if (isUploaded) {
          handleReset();
        }
      }),
  });
  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px",
        overflow: "hidden",
        cursor: "pointer",
        transition:
          "background-color 0.3s ease, scale 0.3s ease,transform 0.3s ease",
        // "&:after": {
        //   content: "''",
        //   position: "absolute",
        //   inset: 0,
        //   background: "rgba(0, 0, 0, 0.4)",
        //   borderRadius: "10px",
        //   transition: "opacity 0.3s ease",
        // },
        // "&:hover": {
        //   scale: "1.03",
        //   transform: "translateY(-5px)",

        //   "&:after": {
        //     opacity: 0.3,
        //   },
        // },

        width: "100%",
        maxWidth: 400,
        aspectRatio: 1.5,
        boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.3)",
      }}
    >
      {filePreview && (
        <>
          <img alt="Carousel Image" src={filePreview} />
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              zIndex: 5,
              width: "100%",
              height: "100%",
              background: "rgba(0, 0, 0, 0.5)",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              fontSize: "1.5rem",
              transition: "opacity 0.3s ease",
            }}
          >
            <Button
              sx={{ display: "flex", gap: 2 }}
              type="submit"
              size="large"
              variant="contained"
              disabled={isAdding}
            >
              {isAdding ? (
                "Loading..."
              ) : (
                <>
                  <CloudUploadIcon />
                  <Typography variant="body1" textTransform={"uppercase"}>
                    upload
                  </Typography>
                </>
              )}
            </Button>
          </Box>
        </>
      )}
      {!filePreview && (
        <>
          <TextField
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            sx={{ display: "none" }}
          />
          <label htmlFor="image">
            <Box
              as={"label"}
              htmlFor="image"
              sx={{
                fontSize: "74px",
                width: "70%",
                cursor: "pointer",
              }}
            >
              <AddCircleIcon fontSize="24rem" />
            </Box>
          </label>
        </>
      )}
    </Box>
  );
}

export default CarouselAddForm;
