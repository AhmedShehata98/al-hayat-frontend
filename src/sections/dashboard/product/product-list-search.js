import { useCallback, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import SearchMdIcon from "@untitled-ui/icons-react/build/esm/SearchMd";
import {
  Box,
  Divider,
  Input,
  MenuItem,
  Stack,
  SvgIcon,
  TextField,
} from "@mui/material";
import useTranslateProducts from "../../../hooks/use-translate-products";

export const ProductListSearch = (props) => {
  const {
    translateProducts: {
      searchBar: searchBarTranslation,
      sort: sortTranslation,
      sortBy: sortByTranslation,
    },
  } = useTranslateProducts();
  const { onFiltersChange, onQueryChange, onSortChange, ...other } = props;
  const queryRef = useRef(null);
  const [sortValue, setSortValue] = useState("all:null");
  const [query, setQuery] = useState("");
  const filterOptions = useMemo(
    () => [
      {
        id: "0",
        label: `${sortByTranslation.all}`,
        value: "all:null",
      },
      {
        id: "1",
        label: `${sortByTranslation.active}`,
        value: "isActive:1",
      },
      {
        id: "2",
        label: `${sortByTranslation.deactivate}`,
        value: "isActive:0",
      },
      {
        id: "3",
        label: `${sortByTranslation.date} - ${sortByTranslation.newest}`,
        value: "orderDate:asc",
      },
      {
        id: "4",
        label: `${sortByTranslation.date} - ${sortByTranslation.oldest}`,
        value: "orderDate:desc",
      },
      {
        id: "5",
        label: `${sortByTranslation.price} - ${sortByTranslation.newest}`,
        value: "price:desc",
      },
      {
        id: "6",
        label: `${sortByTranslation.price} - ${sortByTranslation.oldest}`,
        value: "price:desc",
      },
    ],
    [sortByTranslation]
  );

  const handleChangeSearch = useCallback(
    (ev) => {
      setQuery(ev.target.value);
      onQueryChange?.(ev.target.value);
    },
    [onQueryChange]
  );
  const handleSortChange = (ev) => {
    try {
      const [sortBy, sortDir] = ev.target.value.split(":");
      setSortValue(ev.target.value);

      onSortChange?.({ sortBy, sortDir });
    } catch (error) {
      console.error("Error while choose sort method", error);
    }
  };

  const handleQueryChange = useCallback((event) => {
    event.preventDefault();
    setQuery(queryRef.current?.value || "");
  }, []);

  return (
    <div {...other}>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          paddingX: ".5rem",
          paddingY: ".2rem",
        }}
      >
        <Stack
          alignItems="center"
          component="form"
          direction="row"
          onSubmit={handleQueryChange}
          spacing={2}
          sx={{ p: 2 }}
        >
          <SvgIcon>
            <SearchMdIcon />
          </SvgIcon>
          <Input
            disableUnderline
            fullWidth
            inputProps={{ ref: queryRef }}
            placeholder={searchBarTranslation}
            sx={{ flexGrow: 1 }}
            value={query}
            onChange={handleChangeSearch}
          />
        </Stack>
        <TextField
          sx={{ minWidth: "8rem", flexShrink: "0" }}
          name="sort"
          label={sortTranslation}
          select
          variant="filled"
          value={sortValue}
          onChange={handleSortChange}
        >
          {filterOptions?.map((option) => (
            <MenuItem key={option.id} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Divider />
    </div>
  );
};

ProductListSearch.propTypes = {
  onFiltersChange: PropTypes.func,
};
