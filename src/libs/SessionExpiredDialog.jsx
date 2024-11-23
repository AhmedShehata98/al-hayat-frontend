import React from "react";
import NextLink from "next/link";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import { paths } from "../paths";
import LoginIcon from "@mui/icons-material/Login";
import { useRecoilValue } from "recoil";
import { authAtom } from "../atoms/auth-atom";

const SessionExpiredDialog = () => {
  const authState = useRecoilValue(authAtom);

  return (
    <Dialog
      open={authState.isExpiredSessionDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">login expired</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          your account login session was expired please try to login again and
          continue your work
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          href={paths.index}
          LinkComponent={NextLink}
          color="warning"
          variant="contained"
          endIcon={<LoginIcon />}
          sx={{
            width: {
              xs: "100%",
              sm: "100%",
              md: "40%",
              lg: "20%",
            },
          }}
        >
          login
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SessionExpiredDialog;
