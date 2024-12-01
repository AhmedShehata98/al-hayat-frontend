import {
  Box,
  Button,
  List,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { t } from "i18next";
import React from "react";
import { tokens } from "../../../locales/tokens";
import { LoadingButton } from "@mui/lab";
import { DeleteForever } from "@mui/icons-material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
function SubCategoryList(props) {
  const { error, helperText, onBlur, onChange, initialValues = [] } = props;
  const [subcategories, setSubcategories] = React.useState(initialValues);
  const [input, setInput] = React.useState("");
  const handleAddCategory = () => {
    if (!input) return;
    setSubcategories((prev) => {
      const items = [...prev, input];
      onChange(items);
      return items;
    });
    setInput("");
  };

  const handleDeleteCategory = (category) => {
    setSubcategories((prev) => prev.filter((item) => item !== category));
  };

  return (
    <Stack>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 2,
          padding: "10px 0",
          gap: "10px",
        }}
      >
        <TextField
          label={t(tokens.maintenanceCategoriesCreate.properties.subCategory)}
          error={!!error}
          onChange={(e) => setInput(e.target.value)}
          onBlur={onBlur}
          value={input}
          size="small"
          fullWidth
          helperText={helperText}
        />
        <Button variant="contained" onClick={handleAddCategory}>
          {t(tokens.common.addBtn)}
        </Button>
      </Box>
      <Stack
        sx={{
          backgroundColor: "#ececec",
          padding: "10px",
          borderRadius: "6px",

          display: subcategories.length <= 0 ? "none" : "flex",
        }}
      >
        <Typography fontWeight={"700"} fontSize={16} mt={1} mb={3} px={3}>
          {t(
            tokens.maintenanceCategoriesCreate.properties.subCategoryListHeading
          )}
          :
        </Typography>
        <List component={"ul"}>
          {subcategories.map((subcategory, idx) => (
            <ListItem
              key={idx}
              component={"li"}
              sx={{
                "&:hover": {
                  backgroundColor: "#d2d1d1",
                  color: "#111",
                  listStyleType: "disc !important",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <FiberManualRecordIcon fontSize="12" />
                <Typography sx={{ width: "100%" }} variant="subtitle2">
                  {subcategory}
                </Typography>
              </Box>
              <Box>
                <LoadingButton
                  color="error"
                  onClick={() => handleDeleteCategory(subcategory)}
                >
                  <DeleteForever />
                </LoadingButton>
              </Box>
            </ListItem>
          ))}
        </List>
      </Stack>
    </Stack>
  );
}

export default SubCategoryList;
