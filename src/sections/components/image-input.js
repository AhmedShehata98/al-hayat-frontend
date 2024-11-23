import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import React from "react";
import { VisuallyHiddenInput } from "../../components/visual-hidden-input";
import ImageIcon from "@mui/icons-material/Image";
import { DeleteForever } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";
import { tokens } from "../../locales/tokens";

const ImageInput = ({
  imageFile,
  imageUrl,
  name,
  onChangeFile,
  onChangeUrl,
  onReset,
}) => {
  const [t] = useTranslation();

  const handleGetImageFile = (evt) => {
    const target = evt.target;
    const file = target.files[0];
    if (!file) {
      return;
    }
    onChangeFile(evt, file);
  };

  return (
    <>
      {(imageFile || imageUrl) && (
        <Box
          sx={{
            position: "relative",
            width: 178,
            height: 178,
            borderRadius: "3px",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={imageFile ? URL.createObjectURL(imageFile) : imageUrl}
            width={178}
            height={178}
            alt={`${name}-preview`}
          />
          <Button
            size={"small"}
            sx={{
              position: "absolute",
              top: "0.5rem",
              left: "0.5rem",
              textTransform: "uppercase",
              borderRadius: "4px",
              paddingX: "0.25rem",
            }}
            variant="contained"
            color="error"
            onClick={onReset}
          >
            <DeleteForever />
          </Button>
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <TextField
          type="url"
          onChange={onChangeUrl}
          name={`${name}Url`}
          size="small"
          label={t(tokens.products.productCreate.forms.basicsForm.inputs.image)}
          value={imageUrl}
          sx={{ flex: 1 }}
          disabled={imageFile}
        />
        <Typography>{t(tokens.common.or)}</Typography>
        <FormControl
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
          <LoadingButton
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<ImageIcon />}
            sx={{ borderRadius: "3px", textTransform: "capitalize" }}
            disabled={imageUrl}
          >
            <Typography
              variant="caption"
              sx={{
                display: "block",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                maxWidth: 128,
                lineHeight: "1.2",
              }}
            >
              {imageFile ? imageFile.name : t(tokens.common.uploadImage)}
            </Typography>
            <VisuallyHiddenInput type="file" onChange={handleGetImageFile} />
          </LoadingButton>
        </FormControl>
      </Box>
    </>
  );
};

export default ImageInput;
