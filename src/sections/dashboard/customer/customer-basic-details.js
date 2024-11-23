import PropTypes from "prop-types";
import { Card, CardHeader } from "@mui/material";
import { PropertyList } from "../../../components/property-list";
import { PropertyListItem } from "../../../components/property-list-item";
import useTranslateCustomer from "../../../hooks/use-translate-customer";

export const CustomerBasicDetails = (props) => {
  const customerTranslation = useTranslateCustomer();
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
        title={customerTranslation.detailsPage.details.headingTitle}
      />
      <PropertyList>
        <PropertyListItem
          divider
          label={customerTranslation.detailsPage.details.name}
          value={`${firstName} ${lastName}`}
        />

        <PropertyListItem
          divider
          label={customerTranslation.detailsPage.details.username}
          value={username}
        />
        <PropertyListItem
          divider
          label={customerTranslation.detailsPage.details.email}
          value={email}
        />
        <PropertyListItem
          divider
          label={customerTranslation.detailsPage.details.phone}
          value={phone}
        />
        <PropertyListItem
          divider
          label={customerTranslation.detailsPage.details.currentAddress}
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

CustomerBasicDetails.propTypes = {
  address1: PropTypes.string,
  address2: PropTypes.string,
  country: PropTypes.string,
  email: PropTypes.string.isRequired,
  isVerified: PropTypes.bool.isRequired,
  phone: PropTypes.string,
  state: PropTypes.string,
};
