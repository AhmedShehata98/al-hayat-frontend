import { useCallback } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import {
  Box,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  Typography,
} from "@mui/material";
import { tokens } from "../../../locales/tokens";
import useAppSettings from "../../../hooks/use-app-settings";
const languageOptions = {
  ar: {
    icon: "/assets/flags/flag-ar.svg",
    label: "العربية",
  },
  en: {
    icon: "/assets/flags/flag-uk.svg",
    label: "English",
  },
};

export const LanguagePopover = (props) => {
  const {
    anchorEl,
    onClose,
    open = false,
    handleOpenSnackbar,
    ...other
  } = props;
  const { _, t } = useTranslation();
  const { handleChangeLanguage: changeLanguage } = useAppSettings();

  const handleChangeLanguage = useCallback(
    async (language) => {
      onClose?.();
      const message = t(tokens.common.languageChanged);
      if (language === "ar") {
        changeLanguage({ dir: "rtl", language: "ar" });
      } else {
        changeLanguage({ dir: "ltr", language: "en" });
      }
      handleOpenSnackbar({ message, severity: "success" });
    },
    [onClose, t, changeLanguage, handleOpenSnackbar]
  );

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "right",
        vertical: "bottom",
      }}
      disableScrollLock
      transformOrigin={{
        horizontal: "right",
        vertical: "top",
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 220 } }}
      {...other}
    >
      {Object.keys(languageOptions).map((language) => {
        const option = languageOptions[language];

        return (
          <MenuItem
            onClick={() => handleChangeLanguage(language)}
            key={language}
          >
            <ListItemIcon>
              <Box
                sx={{
                  width: 28,
                  "& img": {
                    width: "100%",
                  },
                }}
              >
                <img src={option.icon} alt={option.label} />
              </Box>
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="subtitle2">{option.label}</Typography>
              }
            />
          </MenuItem>
        );
      })}
    </Popover>
  );
};

LanguagePopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
