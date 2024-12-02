import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { t } from "i18next";
import React from "react";
import { tokens } from "../../../locales/tokens";
import { getCurrentTime } from "../../../utils/time-format";

function AddTimeModal({
  onClose,
  onSave = ({ time: { startTime, endTime } }) => {},
}) {
  const [startTime, setStartTime] = React.useState(getCurrentTime());
  const [endTime, setEndTime] = React.useState(getCurrentTime());

  const handleChangeStartDate = (evt) => {
    const defaultValue = evt.target.value;

    setStartTime(defaultValue);
  };

  const handleChangeEndDate = (evt) => {
    const defaultValue = evt.target.value;

    setEndTime(defaultValue);
  };

  const handleSave = () => {
    const shift = {
      time: {
        startTime: `${startTime}:00`,
        endTime: `${endTime}:00`,
      },
    };
    onSave(shift);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        zIndex: 1100,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
        height: "100%",
        backgroundColor: "#25252562",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#f6f6f6",
          height: "fit-content",
          paddingX: 2,
          paddingY: 1,
          flexBasis: "95%",

          "@media only screen and (min-width: 568px)": {
            flexBasis: "75%",
          },

          "@media only screen and (min-width: 768px)": {
            flexBasis: "65%",
          },
          "@media only screen and (min-width: 992px)": {
            flexBasis: "55%",
          },
          "@media only screen and (min-width: 1200px)": {
            flexBasis: "45%",
          },
        }}
      >
        <Stack sx={{ py: 1 }} flexDirection={"row"}>
          <IconButton
            sx={{
              width: "fit-content",
              color: "#fff",
              aspectRatio: "1",
              borderRadius: "4px",
              backgroundColor: "#f24747",
              px: 2,

              "&:hover": {
                backgroundColor: "#f87474",
              },
            }}
            onClick={() => onClose()}
          >
            x
          </IconButton>
          <Typography variant="h5" sx={{ marginBottom: 1 }} marginX={"auto"}>
            {t(tokens.maintenanceWorkingHours.hours)}
          </Typography>
        </Stack>
        <Stack
          sx={{
            padding: "1rem",
            marginBottom: "1rem",
            gap: "1rem",
            backgroundColor: "#efeded",
          }}
        >
          <Stack
            width={"100%"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={2}
          >
            <Box
              sx={{
                width: "fit-content",
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography flexShrink={0}>
                {t(tokens.maintenanceWorkingHours.startHours)} :
              </Typography>
              <TextField
                type="time"
                name="from-time"
                size="small"
                step="1"
                value={startTime}
                label={t(tokens.maintenanceWorkingHours.startHours)}
                onChange={handleChangeStartDate}
              />
            </Box>
            <Box
              sx={{
                width: "fit-content",
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography flexShrink={0}>
                {t(tokens.maintenanceWorkingHours.endHours)} :
              </Typography>
              <TextField
                type="time"
                name="from-time"
                size="small"
                step="1"
                label={t(tokens.maintenanceWorkingHours.endHours)}
                value={endTime}
                onChange={handleChangeEndDate}
              />
            </Box>
          </Stack>
        </Stack>
        <Stack sx={{ py: 1, gap: "1rem", flexDirection: "row" }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              px: 5,
              borderRadius: "6px",
            }}
            onClick={handleSave}
          >
            {t(tokens.common.saveBtn)}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{
              px: 5,
              borderRadius: "6px",
            }}
            onClick={() => onClose()}
          >
            {t(tokens.common.cancelBtn)}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

export default AddTimeModal;
