import { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Box,
  IconButton,
  Slide,
  Snackbar,
  Tooltip,
} from "@mui/material";
import { LanguagePopover } from "./language-popover";
import useSnackbar from "../../../hooks/use-snackbar";

const languages = {
  ar: "/assets/flags/flag-ar.svg",
  en: "/assets/flags/flag-uk.svg",
};

export const LanguageSwitch = () => {
  const anchorRef = useRef(null);
  const { i18n } = useTranslation();
  const [openPopover, setOpenPopover] = useState(false);
  const {
    anchorOrigin,
    autoHideDuration,
    handleCloseSnackbar,
    handleOpenSnackbar,
    openSnackbar,
  } = useSnackbar();
  const handlePopoverOpen = useCallback(() => {
    setOpenPopover(true);
  }, []);

  const handlePopoverClose = useCallback(() => {
    setOpenPopover(false);
  }, []);

  const flag = languages[i18n.language];

  return (
    <>
      <Tooltip title="Language">
        <IconButton onClick={handlePopoverOpen} ref={anchorRef}>
          <Box
            sx={{
              width: 28,
              "& img": {
                width: "100%",
              },
            }}
          >
            <img src={flag} />
          </Box>
        </IconButton>
      </Tooltip>
      <LanguagePopover
        anchorEl={anchorRef.current}
        onClose={handlePopoverClose}
        open={openPopover}
        handleOpenSnackbar={handleOpenSnackbar}
      />
      <Snackbar
        open={openSnackbar.open}
        autoHideDuration={autoHideDuration}
        onClose={handleCloseSnackbar}
        anchorOrigin={anchorOrigin}
        TransitionComponent={Slide}
      >
        <Alert severity={openSnackbar.severity}>{openSnackbar.message}</Alert>
      </Snackbar>
    </>
  );
};
