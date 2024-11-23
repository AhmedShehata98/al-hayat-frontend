import { useCallback } from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import CreditCard01Icon from "@untitled-ui/icons-react/build/esm/CreditCard01";
import User03Icon from "@untitled-ui/icons-react/build/esm/User03";
import {
  Box,
  Button,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  SvgIcon,
  Typography,
} from "@mui/material";
import { paths } from "../../../paths";
import { useLogout } from "../../../hooks/use-auth";
import useTranslateAppHeader from "../../../hooks/use-translate-app-header";
import { useRecoilValue } from "recoil";
import { authAtom } from "../../../atoms/auth-atom";
import useTranslateToast from "../../../hooks/use-translate-toast";

export const AccountPopover = (props) => {
  const {
    anchorEl,
    onClose,
    open,

    handleOpenSnackbar,
    ...other
  } = props;
  const { logout: logoutMsg, errorMsg } = useTranslateToast();
  const {
    translatedAppHeader: { accountPopover: accountPopoverTranslation },
  } = useTranslateAppHeader();
  const router = useRouter();
  const auth = useRecoilValue(authAtom);
  const { logout, isLoggingOut } = useLogout();
  const fullName = `${auth.user?.firstName} ${auth.user?.lastName}`;

  const handleLogout = useCallback(async () => {
    try {
      onClose?.();

      await logout();
      router.push(paths.index);

      handleOpenSnackbar({
        open: true,
        message: logoutMsg,
        severity: "success",
      });
    } catch (err) {
      handleOpenSnackbar({
        open: true,
        message: errorMsg,
        severity: "error",
      });
      console.error(err);
    }
  }, [router, onClose, logoutMsg, errorMsg, logout, handleOpenSnackbar]);

  return (
    <>
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{
          horizontal: "center",
          vertical: "bottom",
        }}
        disableScrollLock
        onClose={onClose}
        open={!!open}
        PaperProps={{ sx: { width: 200 } }}
        {...other}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="body1" dir={"ltr"}>
            {auth.user?.phoneNumber ?? "NA"}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {fullName || auth.user?.email || "NA"}
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ p: 1 }}>
          <ListItemButton
            component={NextLink}
            href={paths.dashboard.account}
            sx={{
              borderRadius: 1,
              px: 1,
              py: 0.5,
            }}
          >
            <ListItemIcon>
              <SvgIcon fontSize="small">
                <User03Icon />
              </SvgIcon>
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body1">
                  {accountPopoverTranslation.account}
                </Typography>
              }
            />
          </ListItemButton>
          {/* <ListItemButton
          component={NextLink}
          href={paths.dashboard.account}
          sx={{
            borderRadius: 1,
            px: 1,
            py: 0.5,
          }}
        >
          <ListItemIcon>
            <SvgIcon fontSize="small">
              <Settings04Icon />
            </SvgIcon>
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="body1">
                {accountPopoverTranslation.settings}
              </Typography>
            }
          />
        </ListItemButton> */}
          <ListItemButton
            component={NextLink}
            href={paths.dashboard.index}
            sx={{
              borderRadius: 1,
              px: 1,
              py: 0.5,
            }}
          >
            <ListItemIcon>
              <SvgIcon fontSize="small">
                <CreditCard01Icon />
              </SvgIcon>
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body1">
                  {accountPopoverTranslation.billing}
                </Typography>
              }
            />
          </ListItemButton>
        </Box>
        <Divider sx={{ my: "0 !important" }} />
        <Box
          sx={{
            display: "flex",
            p: 1,
            justifyContent: "center",
          }}
        >
          <Button color="inherit" onClick={handleLogout} size="small">
            {accountPopoverTranslation.logout}
          </Button>
        </Box>
      </Popover>
    </>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
