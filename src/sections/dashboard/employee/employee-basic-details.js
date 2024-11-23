import PropTypes from "prop-types";
import { Card, CardHeader } from "@mui/material";
import { PropertyList } from "../../../components/property-list";
import { PropertyListItem } from "../../../components/property-list-item";
import useTranslateEmployee from "../../../hooks/use-translate-employee";

export const EmployeeBasicDetails = (props) => {
  const employeeTranslation = useTranslateEmployee();
  const {
    address1,
    address2,
    country,
    email,
    isVerified,
    firstName,
    lastName,
    username,
    phone,
    currentLocation,
    onDeleteUser,
    state,
    ...other
  } = props;

  return (
    <Card {...other}>
      <CardHeader
        title={employeeTranslation.detailsPage.details.headingTitle}
      />
      <PropertyList>
        <PropertyListItem
          divider
          label={employeeTranslation.detailsPage.details.name}
          value={`${firstName} ${lastName}`}
        />

        <PropertyListItem
          divider
          label={employeeTranslation.detailsPage.details.username}
          value={username}
        />
        <PropertyListItem
          divider
          label={employeeTranslation.detailsPage.details.email}
          value={email}
        />
        <PropertyListItem
          divider
          label={employeeTranslation.detailsPage.details.phone}
          value={phone}
        />
        <PropertyListItem
          divider
          label={employeeTranslation.detailsPage.details.currentAddress}
          value={currentLocation}
        />
        {/* <PropertyListItem
          divider
          label={customerTranslation.detailsPage.details.country}
          value={country}
        />
        <PropertyListItem
          divider
          label={customerTranslation.detailsPage.details.stateOrRegion}
          value={state}
        />
        <PropertyListItem
          divider
          label={customerTranslation.detailsPage.details.address1}
          value={address1}
        />
        <PropertyListItem
          divider
          label={customerTranslation.detailsPage.details.address2}
          value={address2}
        /> */}
      </PropertyList>
      {/* <CardActions>
        <Button color="inherit" size="small">
          {customerTranslation.detailsPage.details.resetPassword}
        </Button>
      </CardActions> */}
    </Card>
  );
};

EmployeeBasicDetails.propTypes = {
  address1: PropTypes.string,
  address2: PropTypes.string,
  country: PropTypes.string,
  email: PropTypes.string.isRequired,
  isVerified: PropTypes.bool.isRequired,
  phone: PropTypes.string,
  state: PropTypes.string,
};
