import { useCallback, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import SearchMdIcon from "@untitled-ui/icons-react/build/esm/SearchMd";
import {
  Box,
  InputAdornment,
  OutlinedInput,
  Stack,
  SvgIcon,
  TextField,
} from "@mui/material";
import { useUpdateEffect } from "../../../hooks/use-update-effect";
import useTranslateCustomer from "../../../hooks/use-translate-customer";

const tabs = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Accepts Marketing",
    value: "hasAcceptedMarketing",
  },
  {
    label: "Prospect",
    value: "isProspect",
  },
  {
    label: "Returning",
    value: "isReturning",
  },
];

export const CustomerListSearch = (props) => {
  const { onFiltersChange, onSortChange, sortBy, sortDir } = props;
  const queryRef = useRef(null);
  const [currentTab, setCurrentTab] = useState("all");
  const [filters, setFilters] = useState({});
  const customerTranslation = useTranslateCustomer();

  const sortOptions = useMemo(
    () => [
      {
        label: `${customerTranslation.sortBy.firstName} - ${customerTranslation.sortBy.newest}`,
        value: "firstName:desc",
      },
      {
        label: `${customerTranslation.sortBy.firstName} - ${customerTranslation.sortBy.oldest}`,
        value: "firstName:asc",
      },
      {
        label: `${customerTranslation.sortBy.lastName} - ${customerTranslation.sortBy.newest}`,
        value: "lastName:desc",
      },
      {
        label: `${customerTranslation.sortBy.lastName} - ${customerTranslation.sortBy.oldest}`,
        value: "lastName:asc",
      },
      {
        label: `${customerTranslation.sortBy.phone} - ${customerTranslation.sortBy.newest}`,
        value: "phoneNumber:desc",
      },
      {
        label: `${customerTranslation.sortBy.phone} - ${customerTranslation.sortBy.oldest}`,
        value: "phoneNumber:asc",
      },

      {
        label: `${customerTranslation.sortBy.username} - ${customerTranslation.sortBy.newest}`,
        value: "username:desc",
      },
      {
        label: `${customerTranslation.sortBy.username} - ${customerTranslation.sortBy.oldest}`,
        value: "username:asc",
      },
    ],
    [customerTranslation]
  );

  const handleFiltersUpdate = useCallback(() => {
    onFiltersChange?.(filters);
  }, [filters, onFiltersChange]);

  useUpdateEffect(() => {
    handleFiltersUpdate();
  }, [filters, handleFiltersUpdate]);

  const handleTabsChange = useCallback((event, value) => {
    setCurrentTab(value);
    setFilters((prevState) => {
      const updatedFilters = {
        ...prevState,
        hasAcceptedMarketing: undefined,
        isProspect: undefined,
        isReturning: undefined,
      };

      if (value !== "all") {
        updatedFilters[value] = true;
      }

      return updatedFilters;
    });
  }, []);

  const handleQueryChange = useCallback((event) => {
    event.preventDefault();
    const target = event.target;
    setFilters((prevState) => ({
      ...prevState,
      query: target.value,
    }));
  }, []);

  const handleSortChange = useCallback(
    (event) => {
      const [sortBy, sortDir] = event.target.value.split(":");
      onSortChange?.({
        sortBy,
        sortDir,
      });
    },
    [onSortChange]
  );

  return (
    <>
      {/* <Tabs
        indicatorColor="primary"
        onChange={handleTabsChange}
        scrollButtons="auto"
        sx={{ px: 3 }}
        textColor="primary"
        value={currentTab}
        variant="scrollable"
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.value}
            label={tab.label}
            value={tab.value}
          />
        ))}
      </Tabs> */}
      {/* <Divider /> */}
      <Stack
        alignItems="center"
        direction="row"
        flexWrap="wrap"
        spacing={3}
        sx={{ p: 3 }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <OutlinedInput
            defaultValue=""
            fullWidth
            inputProps={{ ref: queryRef }}
            placeholder={customerTranslation.searchBar}
            onChange={handleQueryChange}
            startAdornment={
              <InputAdornment position="start">
                <SvgIcon>
                  <SearchMdIcon />
                </SvgIcon>
              </InputAdornment>
            }
          />
        </Box>
        <TextField
          label={customerTranslation.sortSelect}
          name="sort"
          onChange={handleSortChange}
          select
          SelectProps={{ native: true }}
          value={`${sortBy}:${sortDir}`}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
      </Stack>
    </>
  );
};

CustomerListSearch.propTypes = {
  onFiltersChange: PropTypes.func,
  onSortChange: PropTypes.func,
  sortBy: PropTypes.string,
  sortDir: PropTypes.oneOf(["asc", "desc"]),
};
