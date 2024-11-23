import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { tokens } from "../locales/tokens";

const AuthLoader = () => {
  const [t] = useTranslation();
  const [isLateFetch, setIsLateFetch] = useState(false);

  useEffect(() => {
    let timer = setTimeout(() => {
      setIsLateFetch(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Stack
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        backgroundColor: "rgb(0 0 0 / 83%)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "12rem",
          width: "18rem",
          padding: "2rem",
          backgroundColor: "rgb(0 0 0 / 95%)",
          borderRadius: "11px",
        }}
      >
        <CircularProgress />
        <Typography variant="subtitle1" color="text.primary" mt={5}>
          {t(tokens.common.loaderScreen.loading)}
        </Typography>
        {isLateFetch && (
          <Typography
            variant="caption"
            color="text.secondary"
            mt={1}
            textAlign={"centers"}
          >
            {t(tokens.common.loaderScreen.userDataLate)}
          </Typography>
        )}
        <Typography
          variant="caption"
          color="text.secondary"
          textAlign={"centers"}
          mt={3}
        >
          {t(tokens.common.loaderScreen.description)}
        </Typography>
      </Box>
    </Stack>
  );
};

export default AuthLoader;
