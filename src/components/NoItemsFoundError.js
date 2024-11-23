import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

const NoItemsFoundError = ({ errorMessage }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "1.75rem",
      }}
    >
      <Image
        src={"/assets/404-error.svg"}
        width={280}
        height={280}
        alt="404.svg"
      />
      <Typography variant="caption">{errorMessage}</Typography>
    </Box>
  );
};

export default NoItemsFoundError;
