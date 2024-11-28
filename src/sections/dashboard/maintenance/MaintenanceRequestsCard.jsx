import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { t } from "i18next";
import React from "react";
import { tokens } from "../../../locales/tokens";
import NextLink from "next/link";
import { paths } from "../../../paths";
import { prefixImageUrl } from "../../../utils/prefixImageUrl";
import useDateFormat from "../../../hooks/use-date.format";

function MaintenanceRequestsCard({ data }) {
  const { formatDate } = useDateFormat();
  return (
    <Card
      elevation={12}
      sx={{
        borderRadius: "6px !important",
        boxShadow: "0 8px 24px 0 rgba(0, 0, 0, 0.2)",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",

        "&:hover": {
          boxShadow: "0 16px 32px 0 rgba(0, 0, 0, 0.2)",
          transform: "translateY(-5px) ",
        },
      }}
    >
      <CardMedia
        component={"img"}
        height={"180"}
        image={
          data.image
            ? prefixImageUrl(data.image)
            : "/assets/image-not-found-placeholder.png"
        }
        alt="request-img"
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          textTransform={"capitalize"}
          marginBottom={2}
        >
          {data.serviceCategory.name}
        </Typography>
        <Stack flexDirection={"row"} alignItems={"center"} gap={"0.5rem"}>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {data.isWarranty
              ? t(
                  tokens.maintenanceDetails.propertiesList.warrantyStatus
                    .isValid
                )
              : t(
                  tokens.maintenanceDetails.propertiesList.warrantyStatus
                    .isExpired
                )}
          </Typography>
          <Paper
            sx={{
              width: "0.75rem",
              height: "0.75rem",
              backgroundColor: data.isWarranty ? "#04c77c" : "#C62E2E",
              borderRadius: "50%",
            }}
          ></Paper>
        </Stack>
        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {data.description}
        </Typography>
        <Box
          style={{
            backgroundColor: "#e6e6e6",
            borderRadius: "8px",
            flexGrow: 1,
            padding: 10,
            marginTop: 6,
          }}
        >
          <Typography
            sx={{
              textTransform: "capitalize",
              color: "#151414",
              fontSize: 12,
              mb: 2,
            }}
          >
            {t(tokens.maintenanceWorkingHours.workShifts)}
          </Typography>
          <Typography
            sx={{ textTransform: "capitalize", color: "#000000", fontSize: 12 }}
          >
            {data.visitTime}
          </Typography>
          <Typography
            sx={{ textTransform: "capitalize", color: "#000000", fontSize: 12 }}
          >
            {formatDate(data.visitDate)}
          </Typography>
        </Box>
      </CardContent>{" "}
      <CardActions>
        <Link
          fontSize={13}
          component={NextLink}
          href={paths.dashboard.maintenance.maintenanceRequestDetails.replace(
            ":maintenance-request-id",
            data.id
          )}
        >
          {t(tokens.common.detailsBtn)}
        </Link>
        <Button size="small" color="error">
          {t(tokens.common.cancelBtn)}
        </Button>
      </CardActions>
    </Card>
  );
}

export default MaintenanceRequestsCard;
