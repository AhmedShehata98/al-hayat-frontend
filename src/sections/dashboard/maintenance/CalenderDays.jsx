import {
  Box,
  Button,
  IconButton,
  Paper,
  Portal,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { tokens } from "../../../locales/tokens";
import AddTimeModal from "./AddTimeModal";
import { createPortal } from "react-dom";
import { DeleteForeverOutlined, EditIcon } from "@mui/icons-material";
import DayItemCard from "./DayItemCard";

// const days = [
//   "saturday",
//   "sunday",
//   "monday",
//   "tuesday",
//   "wednesday",
//   "thursday",
//   "friday",
// ];

function CalenderDays({
  onAdd = (day) => {},
  onDeleteDay = (day) => {},
  onDeleteShift = ({ day, shift }) => {},
  onAddNewShift = ({ day, time }) => {},
  days = [],
}) {
  const [isShownTimeModal, setIsShownTimeModal] = React.useState(false);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [selectedDay, setSelectedDay] = React.useState(null);
  const [t] = useTranslation();

  const handleAdd = (day) => {
    try {
      setIsShownTimeModal(true);
      setSelectedDay(day);
      setIsUpdating(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveTime = (shift) => {
    try {
      if (isUpdating) {
        handleSaveNewShift({ day: selectedDay, shift });
        return;
      }
      handleAddDay({ day: selectedDay, shift });
      return;
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddDay = ({ day, shift }) => {
    setIsShownTimeModal(false);
    setIsUpdating(false);
    onAdd({ day, shift });
  };

  const handleSaveNewShift = ({ day, shift }) => {
    setIsUpdating(false);
    setIsShownTimeModal(false);
    onAddNewShift({ day, shift });
  };

  const handleAddShift = (day) => {
    setIsShownTimeModal(true);
    setIsUpdating(true);
    setSelectedDay(day);
  };

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          height: "fit-content",
        }}
      >
        <Stack
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "6px",
            padding: 1,
            backgroundColor: "#dedede",
            borderRadius: "4px",

            "@media screen and (min-width: 576px)": {
              gridTemplateColumns: "1fr 1fr",
            },
            "@media screen and (min-width: 820px)": {
              gridTemplateColumns: "1fr 1fr 1fr",
            },
            "@media screen and (min-width: 1024px)": {
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
            },
          }}
        >
          {days.map((item, index) => {
            return (
              <DayItemCard
                key={`${index}_${item.day}`}
                data={item}
                onDeleteDay={onDeleteDay}
                onDeleteShift={onDeleteShift}
                onAdd={handleAdd}
                onAddShift={handleAddShift}
              />
            );
          })}
        </Stack>
      </Paper>
      {isShownTimeModal &&
        createPortal(
          <AddTimeModal
            onClose={() => setIsShownTimeModal(false)}
            onSave={handleSaveTime}
          />,
          document.querySelector("#modal")
        )}
    </>
  );
}

export default CalenderDays;
