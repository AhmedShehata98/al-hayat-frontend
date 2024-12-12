import {
  Alert,
  AlertTitle,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { t } from "i18next";
import React from "react";
import { tokens } from "../locales/tokens";
import { LoadingButton } from "@mui/lab";

function DataListRender({
  queryKey = [],
  queryFn = async () => {},
  enabled = false,
  dataExtractor,
  children,
  title,
}) {
  const { refetch, data, isLoading, isSuccess, isError, error } = useQuery({
    queryKey,
    queryFn,
    enabled,
  });

  if (isLoading)
    return (
      <Paper
        sx={{
          gap: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "-2px 2px 14px 0px rgb(0 0 0 / 10%)",
          flexDirection: "column",
          paddingY: 6,
          gridColumn: "span 3 / span 1",
        }}
      >
        <CircularProgress size="50px" />
        <Typography variant="body1">
          {t(tokens.common.loaderScreen.default)}
        </Typography>
      </Paper>
    );
  if (isError)
    return (
      <Alert
        severity="error"
        sx={{ flex: 1, width: "100%", gridColumn: "span 12 / span 1" }}
        action={
          <LoadingButton
            loading={isLoading}
            color="error"
            variant="contained"
            sx={{ borderRadius: "6px" }}
            onClick={async () => await refetch()}
          >
            {t(tokens.common.tryAgainBtn)}
          </LoadingButton>
        }
      >
        <AlertTitle>
          {t(tokens.networkMessages.somethingWentWrong.title)}
        </AlertTitle>
        <Typography variant="body1">
          {t(tokens.networkMessages.somethingWentWrong.message)}
        </Typography>
      </Alert>
    );
  if (isSuccess && dataExtractor(data)?.length <= 0) {
    return (
      <Alert
        severity="info"
        id="alert"
        sx={{ flex: 1, width: "100%", gridColumn: "span 12 / span 1" }}
        action={
          <LoadingButton
            loading={isLoading}
            variant="contained"
            sx={{ borderRadius: "6px" }}
            color="info"
            onClick={async () => await refetch()}
          >
            {t(tokens.common.tryAgainBtn)}
          </LoadingButton>
        }
      >
        <AlertTitle>
          {t(tokens.networkMessages.noFoundResources.title).replace(
            "{resourceName}",
            title
          )}
        </AlertTitle>
        <Typography variant="body1">
          {t(tokens.networkMessages.noFoundResources.message).replace(
            "{resourceName}",
            title
          )}
        </Typography>
      </Alert>
    );
  }
  if (isSuccess && data) {
    return children({ data });
  }
}

export default DataListRender;
