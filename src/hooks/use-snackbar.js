import React, { useMemo, useState } from "react";
import useTranslateToast from "./use-translate-toast";
import useAppSettings from "./use-app-settings";

const useSnackbar = () => {
  const translatedToast = useTranslateToast();
  const { settings } = useAppSettings();
  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    severity: "success",
    message: "NA",
  });
  const autoHideDuration = 5000;

  const anchorOrigin = useMemo(
    () => ({
      vertical: "bottom",
      horizontal: settings.direction === "ltr" ? "left" : "right",
    }),
    [settings.direction]
  );

  const handleOpenSnackbar = ({ severity, message }) => {
    setOpenSnackbar({ open: true, severity, message });
  };
  const handleCloseSnackbar = () => {
    setOpenSnackbar((prev) => ({ ...prev, open: false }));
  };

  return {
    translatedToast,
    openSnackbar,
    anchorOrigin,
    autoHideDuration,
    handleOpenSnackbar,
    handleCloseSnackbar,
  };
};

export default useSnackbar;
