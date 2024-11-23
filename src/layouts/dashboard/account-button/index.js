import { useCallback, useRef, useState } from "react";
import User01Icon from "@untitled-ui/icons-react/build/esm/User01";
import {
  Alert,
  Avatar,
  Box,
  ButtonBase,
  Slide,
  Snackbar,
  SvgIcon,
} from "@mui/material";
import { AccountPopover } from "./account-popover";
import useSnackbar from "../../../hooks/use-snackbar";

export const AccountButton = () => {
  const anchorRef = useRef(null);
  const [openPopover, setOpenPopover] = useState(false);
  const {
    anchorOrigin,
    autoHideDuration,
    handleCloseSnackbar,
    handleOpenSnackbar,
    openSnackbar,
    translatedToast,
  } = useSnackbar();
  const handlePopoverOpen = useCallback(() => {
    setOpenPopover(true);
  }, []);

  const handlePopoverClose = useCallback(() => {
    setOpenPopover(false);
  }, []);

  return (
    <>
      <Box
        component={ButtonBase}
        onClick={handlePopoverOpen}
        ref={anchorRef}
        sx={{
          alignItems: "center",
          display: "flex",
          borderWidth: 2,
          borderStyle: "solid",
          borderColor: "divider",
          height: 40,
          width: 40,
          borderRadius: "50%",
        }}
      >
        <Avatar
          sx={{
            height: 32,
            width: 32,
          }}
          // src={user?.avatar || undefined}
        >
          <SvgIcon>
            <User01Icon />
          </SvgIcon>
        </Avatar>
      </Box>
      <AccountPopover
        anchorEl={anchorRef.current}
        onClose={handlePopoverClose}
        open={openPopover}
        handleOpenSnackbar={handleOpenSnackbar}
      />
      <Snackbar
        open={openSnackbar.open}
        autoHideDuration={autoHideDuration}
        onClose={handleCloseSnackbar}
        message={openSnackbar.message}
        anchorOrigin={anchorOrigin}
        TransitionComponent={Slide}
      >
        <Alert severity={openSnackbar.severity}></Alert>
      </Snackbar>
    </>
  );
};
