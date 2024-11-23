import { Stack, Typography } from "@mui/material";
import React from "react";

function ServiceSummeryWrapper({ title, children }) {
  return (
    <Stack
      sx={{
        marginTop: 20,
        paddingTop: 8,
        paddingX: 2,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        gap: 2,
      }}
    >
      <Typography variant="h5" fontWeight="bold">
        {title}
      </Typography>
      <Stack
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          gap: "0.25rem",
          paddingX: 0,
        }}
        component={"ul"}
      >
        {children}
      </Stack>
    </Stack>
  );
}

export default ServiceSummeryWrapper;
