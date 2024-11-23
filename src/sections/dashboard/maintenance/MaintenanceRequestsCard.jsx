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
  Typography,
} from "@mui/material";
import { t } from "i18next";
import React from "react";
import { tokens } from "../../../locales/tokens";
import NextLink from "next/link";
import { paths } from "../../../paths";

function MaintenanceRequestsCard() {
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
        image="https://picsum.photos/200"
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
          request title
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          location of the request
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          request time: 12:30 PM
        </Typography>
      </CardContent>{" "}
      <CardActions>
        <Link
          fontSize={13}
          component={NextLink}
          href={paths.dashboard.maintenance.maintenanceRequestDetails}
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
