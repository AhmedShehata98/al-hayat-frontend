import React from "react";
import PropTypes from "prop-types";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  alpha,
  Avatar,
  Box,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Stack,
  styled,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BallotIcon from "@mui/icons-material/Ballot";
import { parseCategoryQuestions } from "../../../utils/parse-category-questions";
import useTranslateCategory from "../../../hooks/use-translate-category";
import CategoryIcon from "../../../icons/untitled-ui/duocolor/category";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForever from "@mui/icons-material/DeleteForever";
import { useDeleteCategory } from "../../../hooks/use-categories";
import { paths } from "../../../paths";
import NextLink from "next/link";
import toast from "react-hot-toast";
import { prefixImageUrl } from "../../../utils/prefixImageUrl";
import Image from "next/image";
const CategoryCard = (props) => {
  const { translatedCategory } = useTranslateCategory();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { palette } = useTheme();
  const { category, onDelete, translatedToast, handleOpenSnackbar } = props;
  const { deleteCategory, isDeleting } = useDeleteCategory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = async () => {
    setAnchorEl(null);
  };

  const handleDelete = async (category) => {
    try {
      await deleteCategory(category.id);
      setAnchorEl(null);

      handleOpenSnackbar({
        message: translatedToast.deleteMsg.replace("@", `#${category.name}`),
        severity: "success",
      });
    } catch (error) {
      handleOpenSnackbar({
        message: translatedToast.errorMsg,
        severity: "success",
      });
      console.error("category delete error :", error);
    }
  };

  const handleUpdate = (category) => {
    if (!category) {
      toast.error("Please select a category to update");
      return;
    }
    router.push(
      `${paths.dashboard.categories.create}?id=${category.id}&update=1`
    );
  };

  return (
    <Stack
      padding="0.5rem"
      spacing={1}
      sx={{
        boxShadow: "#7b78784d 0 0 4px 0px",
        backgroundColor: category.isUsed
          ? alpha(theme.palette.secondary?.[theme.palette.mode], 0.1)
          : undefined,
      }}
    >
      <Stack flexDirection={"row"} width={"100%"}>
        <Paper
          sx={{
            width: "4rem",
            height: "4rem",
            backgroundColor: palette.primary.main,
            borderRadius: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "background-color 0.3s ease-in-out",
            color: "white",
            aspectRatio: "3 / 3",
            flexShrink: 0,
            overflow: "hidden",
          }}
        >
          {Boolean(category.imageUrl) ? (
            <Image
              src={prefixImageUrl(category.imageUrl)}
              alt={category.imageUrl
                .split("/")
                .pop()
                .slice(category.imageUrl.split("/").pop().length / 2)}
              width={56}
              height={56}
            />
          ) : (
            <CategoryIcon />
          )}
        </Paper>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            flexDirection: "column",
            paddingInlineStart: "1rem",
            flexGrow: 1,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Tooltip title={category.name}>
              <Typography
                variant="caption"
                textTransform={"uppercase"}
                sx={{
                  maxWidth: "100px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {category.name}
              </Typography>
            </Tooltip>
            <Box
              component={"button"}
              sx={{
                color: theme.palette.secondary?.[theme.palette.mode],

                backgroundColor: "transparent",
                border: "none",
                width: "2rem",
                cursor: "pointer",
              }}
              onClick={handleClick}
            >
              <MoreVertIcon />
            </Box>
            <StyledMenu
              id="customized-menu"
              MenuListProps={{
                "aria-labelledby": "customized-button",
              }}
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem disableRipple>
                <Link
                  component={NextLink}
                  href={`${paths.dashboard.categories.create}?id=${category.id}&update=1`}
                  underline="none"
                  color={"GrayText"}
                >
                  <EditIcon />
                  {translatedCategory.categoryCard.actions.edit}
                </Link>
              </MenuItem>
              {!category.isUsed && (
                <MenuItem
                  onClick={() => handleDelete(category)}
                  disableRipple
                  sx={{
                    opacity: isDeleting ? "0,4" : "1",
                    pointerEvents: isDeleting ? "none" : "auto",
                    backgroundColor: theme.palette.error?.[theme.palette.mode],
                  }}
                >
                  <DeleteForever />
                  {translatedCategory.categoryCard.actions.delete}
                </MenuItem>
              )}
            </StyledMenu>
          </Box>
          <Tooltip title={category.type}>
            <Typography variant="caption" color={"text.secondary"}>
              {category.type}
            </Typography>
          </Tooltip>
        </Box>
      </Stack>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography variant="overline">
            {translatedCategory.categoryCard.questions}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List sx={{ width: "100%" }}>
            {parseCategoryQuestions(category.questions).map((question, idx) => (
              <ListItem key={idx} sx={{ paddingX: "0px" }}>
                <ListItemAvatar>
                  <Avatar>
                    <BallotIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography sx={{ fontSize: ".75rem" }}>
                      {question}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
};

export default CategoryCard;

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));
CategoryCard.prototype = {
  category: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  isDeleting: PropTypes.bool.isRequired,
};
