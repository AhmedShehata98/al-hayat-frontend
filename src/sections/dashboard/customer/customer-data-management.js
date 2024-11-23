import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import useTranslateCustomer from "../../../hooks/use-translate-customer";

export const CustomerDataManagement = (props) => {
  const customerTranslation = useTranslateCustomer();
  return (
    <Card {...props}>
      <CardHeader
        title={customerTranslation.detailsPage.details.dataManagement.title}
      />
      <CardContent sx={{ pt: 0 }}>
        <Button color="error" variant="outlined" onClick={props?.onDeleteUser}>
          {customerTranslation.detailsPage.details.dataManagement.cta}
        </Button>
        <Box sx={{ mt: 1 }}>
          <Typography color="text.secondary" variant="body2">
            {customerTranslation.detailsPage.details.dataManagement.description}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
