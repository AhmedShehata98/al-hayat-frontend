import { useCallback, useRef } from "react";
import PropTypes from "prop-types";
import SearchMdIcon from "@untitled-ui/icons-react/build/esm/SearchMd";
import {
  Box,
  Divider,
  InputAdornment,
  OutlinedInput,
  Stack,
  SvgIcon,
  TextField,
} from "@mui/material";
import useTranslateOrders from "../../../hooks/use-translate-orders";

export const OrderListSearch = (props) => {
  const { translatedOrders } = useTranslateOrders();

  const {
    onSortChange,
    onSearchQueryChange,
    sortBy = "orderDate",
    sortDir = "asc",
    sortOptions,
    TabsComponent,
  } = props;
  const queryRef = useRef(null);

  const handleQueryChange = useCallback(
    (event) => {
      event.preventDefault();
      const query = event.target.value;
      onSearchQueryChange?.(query);
    },
    [onSearchQueryChange]
  );

  const handleSortChange = useCallback(
    (event) => {
      const sortValue = event.target.value;
      const [sortBy, sortDir] = sortValue.split(":");
      onSortChange?.({ sortBy, sortDir });
    },
    [onSortChange]
  );

  return (
    <div>
      {TabsComponent}
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        flexWrap="wrap"
        gap={3}
        sx={{ p: 3 }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <OutlinedInput
            defaultValue=""
            fullWidth
            inputProps={{ ref: queryRef }}
            onChange={handleQueryChange}
            name="orderNumber"
            placeholder={translatedOrders.searchBar}
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
          label={translatedOrders.sortBy}
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
    </div>
  );
};

OrderListSearch.propTypes = {
  onFiltersChange: PropTypes.func,
  onSortChange: PropTypes.func,
  sortBy: PropTypes.string,
  sortDir: PropTypes.oneOf(["asc", "desc"]),
};
