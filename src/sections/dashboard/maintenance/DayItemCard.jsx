import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { t } from "i18next";
import { tokens } from "../../../locales/tokens";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ClearIcon from "@mui/icons-material/Clear";
import PushPinIcon from "@mui/icons-material/PushPin";

function DayItemCard({
  data,
  // shifts,
  // isSelected,
  // activeColor = { vacation: "", working: "" },
  // textActiveColor,
  onDeleteShift,
  onDeleteDay,
  onAdd,
  onAddShift,
}) {
  return (
    <Box
      sx={{
        height: "fit-content",
        borderRadius: "6px",
        backgroundColor: "#f8f8f8",
        overflow: "hidden",
      }}
    >
      <Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems={"center"}
          spacing={1}
          gap={2}
          p={1}
          backgroundColor={
            data.isSelected && data.isWorkingDay
              ? data.backgroundColor.working
              : data.backgroundColor.vacation
          }
          color={
            data.isSelected && data.isWorkingDay
              ? data.color.working
              : data.color.vacation
          }
        >
          <Typography variant="body1" fontWeight={"bold"}>
            {t(tokens.maintenanceWorkingHours.weekDays[data.day])}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.2,
            }}
          >
            <IconButton
              color="error"
              sx={{ display: data.isSelected ? "flex" : "none" }}
              onClick={() => onDeleteDay(data.day)}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              sx={{
                display:
                  !data.isSelected && !data.isWorkingDay ? "flex" : "none",
                color: data.isWorkingDay
                  ? data.color.working
                  : data.color.vacation,
              }}
              onClick={() => onAdd(data.day)}
            >
              <PushPinIcon sx={{ rotate: "-45deg" }} />
            </IconButton>
          </Box>
        </Stack>
        <Typography
          variant="body2"
          textAlign={"start"}
          px={3}
          mt={3}
          display={data.shifts.length <= 0 ? "none" : "flex"}
        >
          {t(tokens.maintenanceWorkingHours.workShifts)}
        </Typography>
        <Stack
          component={"ul"}
          mx={0}
          px={2}
          display={data.shifts.length <= 0 ? "none" : "flex"}
        >
          {data.shifts.map((shift, idx) => (
            <Box
              key={idx}
              component={"li"}
              sx={{
                display: "flex",
                gap: "0.5rem",
                alignItems: "center",
                backgroundColor: "#dedede",
              }}
            >
              <ArrowLeftIcon />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "0.2rem",
                  width: "100%",
                  px: 2.5,
                  py: 1.5,
                }}
              >
                <Typography variant="body2" color={"text.secondary"}>
                  {t(tokens.maintenanceWorkingHours.from)}
                </Typography>
                <Typography variant="body1">{shift.time.startTime}</Typography>
                <Typography variant="body2" color={"text.secondary"}>
                  {t(tokens.maintenanceWorkingHours.to)}
                </Typography>
                <Typography variant="body1">{shift.time.endTime}</Typography>
              </Box>
              {data.shifts.length >= 2 && (
                <IconButton
                  onClick={() =>
                    onDeleteShift({ day: data.day, shiftId: shift.id })
                  }
                  color="error"
                >
                  <ClearIcon />
                </IconButton>
              )}
            </Box>
          ))}
          <Button
            startIcon={<AddBoxIcon />}
            onClick={() => onAddShift(data.day)}
            variant="contained"
            sx={{ mt: 2, borderRadius: "4px" }}
            size="small"
          >
            {t(tokens.maintenanceWorkingHours.addShift)}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default DayItemCard;
