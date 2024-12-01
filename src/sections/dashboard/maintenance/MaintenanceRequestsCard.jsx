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
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import { requestStatusColors } from "../../../utils/maintenance-requests";

function MaintenanceRequestsCard({ data }) {
  const { formatDate } = useDateFormat();
  return (
    <Card
      elevation={12}
      sx={{
        borderRadius: "6px !important",
        boxShadow: "0 8px 24px 0 rgba(0, 0, 0, 0.2)",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        position: "relative",

        "&:hover": {
          boxShadow: "0 16px 32px 0 rgba(0, 0, 0, 0.2)",
          transform: "translateY(-5px) ",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          right: "25px",
          top: "25px",
          paddingX: "1rem",
          paddingY: "0.5rem",
          borderRadius: "6px",
          fontWeight: "600",
          textTransform: "uppercase",
          fontSize: "12px",
          backgroundColor: requestStatusColors(data.status.toLowerCase())
            .backgroundColor,
          color: requestStatusColors(data.status.toLowerCase()).color,
        }}
      >
        {data.status}
      </Box>
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
          {data.repairingServiceName}
        </Typography>
        <Stack flexDirection={"row"} alignItems={"center"} gap={"0.5rem"}>
          <Typography
            variant="body2"
            sx={{
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
            {t(tokens.maintenanceWorkingHours.visitTime)}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              gap: 1,
              mb: 1,
            }}
          >
            <AccessTimeIcon />
            <Typography
              sx={{
                textTransform: "capitalize",
                color: "#000000",
                fontSize: 12,
              }}
            >
              {data.visitTime}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              gap: 1,
            }}
          >
            <CalendarMonthIcon />
            <Typography
              sx={{
                textTransform: "capitalize",
                color: "#000000",
                fontSize: 12,
              }}
            >
              {formatDate(data.visitDate)}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "1rem",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: 1,
            padding: 1,
            marginY: "1rem",
          }}
        >
          <FmdGoodIcon />
          <Typography
            variant="caption"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            {`${data.address.postalCode} - ${data.address.city}, ${data.address.country}`}
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ px: 3 }}>
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
