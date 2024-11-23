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

const categoryOptions = [
  {
    label: "Healthcare",
    value: "healthcare",
  },
  {
    label: "Makeup",
    value: "makeup",
  },
  {
    label: "Dress",
    value: "dress",
  },
  {
    label: "Skincare",
    value: "skincare",
  },
  {
    label: "Jewelry",
    value: "jewelry",
  },
  {
    label: "Blouse",
    value: "blouse",
  },
];

const statusOptions = [
  {
    label: "Published",
    value: "published",
  },
  {
    label: "Draft",
    value: "draft",
  },
];

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
  const [sortValue, setSortValue] = useState("orderDate:asc");
  const [query, setQuery] = useState("");
  const [chips, setChips] = useState([]);
  const filterOptions = useMemo(
    () => [
      {
        id: "1",
        label: `${sortByTranslation.date} - ${sortByTranslation.newest}`,
        value: "orderDate:asc",
      },
      {
        id: "2",
        label: `${sortByTranslation.date} - ${sortByTranslation.oldest}`,
        value: "orderDate:desc",
      },
      {
        id: "3",
        label: `${sortByTranslation.price} - ${sortByTranslation.newest}`,
        value: "price:desc",
      },
      {
        id: "3",
        label: `${sortByTranslation.price} - ${sortByTranslation.oldest}`,
        value: "price:desc",
      },
    ],
    [sortByTranslation]
  );

  const handleChipsUpdate = useCallback(() => {
    const filters = {
      name: undefined,
      category: [],
      status: [],
      inStock: undefined,
      query: undefined,
    };

    chips.forEach((chip) => {
      switch (chip.field) {
        case "name":
          // There will (or should) be only one chips with field "name"
          // so we can set up it directly
          filters.name = chip.value;
          break;
        case "category":
          filters.category.push(chip.value);
          break;
        case "status":
          filters.status.push(chip.value);
          break;
        case "inStock":
          // The value can be "available" or "outOfStock" and we transform it to a boolean
          filters.inStock = chip.value === "available";
          break;
        default:
          break;
      }
    });

    onFiltersChange?.(filters);
  }, [chips, onFiltersChange]);

  const handleChangeSearch = useCallback(
    (ev) => {
      setQuery(ev.target.value);
      onQueryChange?.(ev.target.value);
    },
    [onQueryChange]
  );
  const handleSortChange = useCallback(
    (ev) => {
      const [sortBy, sortDir] = ev.target.value.split(":");
      setSortValue(ev.target.value);
      onSortChange?.({ sortBy, sortDir });
    },
    [onSortChange]
  );

  // useUpdateEffect(() => {
  //   handleChipsUpdate();
  // }, [chips, handleChipsUpdate]);

  const handleChipDelete = useCallback((deletedChip) => {
    setChips((prevChips) => {
      return prevChips.filter((chip) => {
        // There can exist multiple chips for the same field.
        // Filter them by value.

        return !(
          deletedChip.field === chip.field && deletedChip.value === chip.value
        );
      });
    });
  }, []);

  const handleQueryChange = useCallback((event) => {
    event.preventDefault();
    setQuery(queryRef.current?.value || "");
  }, []);

  const handleCategoryChange = useCallback((values) => {
    setChips((prevChips) => {
      const valuesFound = [];

      // First cleanup the previous chips
      const newChips = prevChips.filter((chip) => {
        if (chip.field !== "category") {
          return true;
        }

        const found = values.includes(chip.value);

        if (found) {
          valuesFound.push(chip.value);
        }

        return found;
      });

      // Nothing changed
      if (values.length === valuesFound.length) {
        return newChips;
      }

      values.forEach((value) => {
        if (!valuesFound.includes(value)) {
          const option = categoryOptions.find(
            (option) => option.value === value
          );

          newChips.push({
            label: "Category",
            field: "category",
            value,
            displayValue: option.label,
          });
        }
      });

      return newChips;
    });
  }, []);

  const handleStatusChange = useCallback((values) => {
    setChips((prevChips) => {
      const valuesFound = [];

      // First cleanup the previous chips
      const newChips = prevChips.filter((chip) => {
        if (chip.field !== "status") {
          return true;
        }

        const found = values.includes(chip.value);

        if (found) {
          valuesFound.push(chip.value);
        }

        return found;
      });

      // Nothing changed
      if (values.length === valuesFound.length) {
        return newChips;
      }

      values.forEach((value) => {
        if (!valuesFound.includes(value)) {
          const option = statusOptions.find((option) => option.value === value);

          newChips.push({
            label: "Status",
            field: "status",
            value,
            displayValue: option.label,
          });
        }
      });

      return newChips;
    });
  }, []);

  const handleStockChange = useCallback((values) => {
    // Stock can only have one value, even if displayed as multi-select, so we select the first one.
    // This example allows you to select one value or "All", which is not included in the
    // rest of multi-selects.

    setChips((prevChips) => {
      // First cleanup the previous chips
      const newChips = prevChips.filter((chip) => chip.field !== "inStock");
      const latestValue = values[values.length - 1];

      switch (latestValue) {
        case "available":
          newChips.push({
            label: "Stock",
            field: "inStock",
            value: "available",
            displayValue: "Available",
          });
          break;
        case "outOfStock":
          newChips.push({
            label: "Stock",
            field: "inStock",
            value: "outOfStock",
            displayValue: "Out of Stock",
          });
          break;
        default:
          // Should be "all", so we do not add this filter
          break;
      }

      return newChips;
    });
  }, []);

  // We memoize this part to prevent re-render issues
  const categoryValues = useMemo(
    () =>
      chips
        .filter((chip) => chip.field === "category")
        .map((chip) => chip.value),
    [chips]
  );

  const statusValues = useMemo(
    () =>
      chips.filter((chip) => chip.field === "status").map((chip) => chip.value),
    [chips]
  );

  const stockValues = useMemo(() => {
    const values = chips
      .filter((chip) => chip.field === "inStock")
      .map((chip) => chip.value);

    // Since we do not display the "all" as chip, we add it to the multi-select as a selected value
    if (values.length === 0) {
      values.unshift("all");
    }

    return values;
  }, [chips]);

  const showChips = chips.length > 0;

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
          {/* <MenuItem value="orderDate:asc">newest</MenuItem>
          <MenuItem value="orderDate:desc">oldest</MenuItem>
          <MenuItem value="price:asc">Lowest Price</MenuItem>
          <MenuItem value="price:desc">Highest price</MenuItem> */}
        </TextField>
      </Box>
      <Divider />
      {/* {showChips ? (
        <Stack
          alignItems="center"
          direction="row"
          flexWrap="wrap"
          gap={1}
          sx={{ p: 2 }}
        >
          {chips.map((chip, index) => (
            <Chip
              key={index}
              label={
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    "& span": {
                      fontWeight: 600,
                    },
                  }}
                >
                  <>
                    <span>{chip.label}</span>: {chip.displayValue || chip.value}
                  </>
                </Box>
              }
              onDelete={() => handleChipDelete(chip)}
              variant="outlined"
            />
          ))}
        </Stack>
      ) : (
        <Box sx={{ p: 2.5 }}>
          <Typography color="text.secondary" variant="subtitle2">
            No filters applied
          </Typography>
        </Box>
      )}
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        flexWrap="wrap"
        spacing={1}
        sx={{ p: 1 }}
      >
        <MultiSelect
          label="Category"
          onChange={handleCategoryChange}
          options={categoryOptions}
          value={categoryValues}
        />
        <MultiSelect
          label="Status"
          onChange={handleStatusChange}
          options={statusOptions}
          value={statusValues}
        />
        <MultiSelect
          label="Stock"
          onChange={handleStockChange}
          options={stockOptions}
          value={stockValues}
        />
      </Stack> */}
    </div>
  );
};

ProductListSearch.propTypes = {
  onFiltersChange: PropTypes.func,
};
