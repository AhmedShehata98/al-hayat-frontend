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

const MAINTENANCE_TYPES = [
  { value: "type 1", label: "type 1" },
  { value: "type 2", label: "type 2" },
  { value: "type 3", label: "type 3" },
  { value: "type 4", label: "type 4" },
  { value: "type 5", label: "type 5" },
  { value: "type 6", label: "type 6" },
  { value: "type 7", label: "type 7" },
];
function AddTimeModal({
  onClose,
  onSave = ({ time: { startTime, endTime } }) => {},
}) {
  const [startTime, setStartTime] = React.useState(getCurrentTime());
  const [endTime, setEndTime] = React.useState(getCurrentTime());

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
        padding: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#f6f6f6",
          width: "95%",
          height: "fit-content",
          paddingX: 2,
          paddingY: 1,

          "@media screen and (min-width: 768px)": {
            width: "40%",
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
                value={startTime}
                label={t(tokens.maintenanceWorkingHours.startHours)}
                onChange={(evt) => setStartTime(evt.target.value)}
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
                label={t(tokens.maintenanceWorkingHours.endHours)}
                value={endTime}
                onChange={(evt) => setEndTime(evt.target.value)}
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
            onClick={() => {
              const shift = { time: { startTime, endTime } };
              onSave(shift);
            }}
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
