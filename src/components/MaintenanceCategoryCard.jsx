import { LoadingButton } from "@mui/lab";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Snackbar,
  Alert,
  Button,
} from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { prefixImageUrl } from "../utils/prefixImageUrl";
import useDateFormat from "../hooks/use-date.format";
import { useDeleteMaintenanceService } from "../hooks/use-maintenance";
import useSnackbar from "../hooks/use-snackbar";
import { tokens } from "../locales/tokens";
import { t } from "i18next";
import { paths } from "../paths";
import { useRouter } from "next/navigation";
import NextImage from "next/image";

function MaintenanceCategoryCard({ service, onUpdate }) {
  const { deleteMaintenanceServiceAsync, isDeletingMaintenanceService } =
    useDeleteMaintenanceService();
  const { formatDate } = useDateFormat();
  const router = useRouter();
  const {
    anchorOrigin,
    handleCloseSnackbar,
    handleOpenSnackbar,
    openSnackbar,
    translatedToast,
    autoHideDuration,
  } = useSnackbar();

  const handleDeleteService = async (id) => {
    try {
      await deleteMaintenanceServiceAsync(id);
      handleOpenSnackbar({
        severity: "success",
        message: t(tokens.toastMessages.deleteMsg).replace("@", `#${id}`),
      });
    } catch (error) {
      console.log("Error adding maintenance service", error);
      handleOpenSnackbar({
        severity: "error",
        message: t(tokens.toastMessages.errorMsg),
      });
    }
  };
  return (
    <Card sx={{ maxWidth: 345, borderRadius: "8px" }}>
      <CardActionArea>
        <CardMedia
          component={NextImage}
          height="240"
          image={prefixImageUrl(service.imageUrl)}
          src={prefixImageUrl(service.imageUrl)}
          alt={service.imageUrl.split("/").pop()}
          onError={(evt) => {
            evt.target.style.backgroundImage =
              "url('/image-not-found-placeholder.png')";
          }}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="overline"
            lineHeight={"17px"}
            component="div"
          >
            {service.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {formatDate(service.createdAt)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          onClick={() => {
            onUpdate(service.id);
            router.push(
              `${paths.dashboard.maintenance.createCategory}?update=1&id=${service.id}`
            );
          }}
          size="small"
          color="primary"
          startIcon={<EditIcon />}
        >
          {t(tokens.common.updateBtn)}
        </Button>
        <LoadingButton
          size="small"
          color="error"
          startIcon={<DeleteIcon />}
          loading={isDeletingMaintenanceService}
          onClick={() => handleDeleteService(service.id)}
        >
          {t(tokens.common.deleteBtn)}
        </LoadingButton>
      </CardActions>

      <Snackbar
        open={openSnackbar.open}
        autoHideDuration={autoHideDuration}
        anchorOrigin={anchorOrigin}
        onClose={handleCloseSnackbar}
      >
        <Alert severity={openSnackbar.severity}>{openSnackbar.message}</Alert>
      </Snackbar>
    </Card>
  );
}

export default MaintenanceCategoryCard;
