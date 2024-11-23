import { Box, Typography } from "@mui/material";
import React from "react";

function SummeryItem({ label, value }) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        borderBottom: "1px solid var(--color-border-light)",
        paddingY: 1,
      }}
    >
      <Typography
        variant="overline"
        sx={{ minWidth: "20%", fontWeight: "bold", fontSize: 15 }}
      >
        {label}
      </Typography>
      <Box
        sx={{
          fontWeight: "600",
          fontSize: 13,
          color: "text.secondary",
          textTransform: "capitalize",
          flexGrow: 1,
        }}
      >
        {value}
      </Box>
    </Box>
  );
}

export default SummeryItem;
