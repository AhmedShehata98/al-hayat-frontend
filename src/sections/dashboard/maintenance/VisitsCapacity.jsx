import React from "react";
import useStepJumper from "../../../hooks/use-step-jumper";
import { Box, Stack, Typography } from "@mui/material";
import { t } from "i18next";
import { tokens } from "../../../locales/tokens";

const calcPercentage = ({ current, total }) => {
  return Math.round((current / total) * 100);
};

function VisitsCapacity({ currentCapacity = 0, maxCapacity = 0 }) {
  const [capacity] = useStepJumper({
    initialStep: 1,
    maxStep: currentCapacity,
    jumpFrames: 200,
  });

  return (
    <Stack spacing={4} justifyContent={"center"} alignItems={"center"}>
      <Box
        sx={{
          position: "relative",
          width: "3rem",
          height: "12rem",
          backgroundColor: "#edecdc",
          borderRadius: "35px",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <Box
          sx={{
            backgroundColor: "primary.main",
            width: "100%",
            height: `${calcPercentage({
              current: capacity,
              total: maxCapacity,
            })}%`,
            borderRadius: "35px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            transition: "height 0.7s ease-in-out",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              position: "absolute",
              zIndex: 5,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color:
                calcPercentage({ current: capacity, total: maxCapacity }) > 55
                  ? "#f6fefe"
                  : "#161600",
            }}
          >
            {calcPercentage({ current: capacity, total: maxCapacity })}%
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Typography variant="h5">{`${maxCapacity} ${t(
          tokens.maintenanceWorkingHours.totalVisits
        )}`}</Typography>
      </Box>
    </Stack>
  );
}

export default VisitsCapacity;
