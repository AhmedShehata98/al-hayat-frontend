import {
  Box,
  Button,
  Chip,
  Collapse,
  IconButton,
  Popover,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import React, { useCallback, useMemo } from "react";
import NextLink from "next/link";
import dayjs from "dayjs";
import useTranslateProducts from "../../../../hooks/use-translate-products";
import useNumberFormat from "../../../../hooks/use-number-format";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { paths } from "../../../../paths";
import {
  useDeleteProduct,
  useToggleProductActive,
} from "../../../../hooks/use-product";
import { LoadingButton } from "@mui/lab";
import { prefixImageUrl } from "../../../../utils/prefixImageUrl";
import Image from "next/image";
import {
  parseCategoryAnswers,
  parseCategoryQuestions,
} from "../../../../utils/parse-category-questions";
import BuildIcon from "@mui/icons-material/Build";
import { tokens } from "../../../../locales/tokens";
import { t } from "i18next";

export default function CustomRow(props) {
  const {
    translateProducts: {
      productsTable: {
        nestedTables: nestedTablesTranslations,
        mainTable: mainTableTranslations,
      },
    },
  } = useTranslateProducts();
  const { row, translatedToast, handleOpenSnackbar } = props;
  const imageUrl = prefixImageUrl(row.image);
  const imageAltText = row.image?.split("/").pop();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  const { toggleProductActiveAsync, isLoading } = useToggleProductActive();

  const { formatCurrency } = useNumberFormat();
  const parsedQA = useMemo(() => {
    const parsedQuests = row.categoryOptions.questions
      ? parseCategoryQuestions(row.categoryOptions.questions)
      : undefined;
    const parsedAnswers = row.categoryOptions.answers
      ? parseCategoryAnswers(row.categoryOptions.answers)
      : undefined;

    if (parsedQuests && parsedAnswers) {
      return parsedQuests.map((ques, idx) => ({
        question: ques,
        answer: parsedAnswers[idx],
      }));
    }
    return undefined;
  }, [row.categoryOptions.questions, row.categoryOptions.answers]);

  const handleDeleteProduct = useCallback(
    async (productId, isActive) => {
      try {
        const formData = new FormData();
        formData.append("Id", productId);
        formData.append("IsActive", !isActive);

        await toggleProductActiveAsync(formData);
        handleOpenSnackbar({
          message: translatedToast.updateMsg.replace("@", `# ${productId}...`),
          severity: "success",
        });
      } catch (error) {
        handleOpenSnackbar({
          message: t(tokens.networkMessages.somethingWentWrong.message),
          severity: "error",
        });
        console.error(error);
      }
    },
    [toggleProductActiveAsync, handleOpenSnackbar, translatedToast]
  );

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell sx={{ width: "2rem" }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" sx={{ width: "6rem" }}>
          {row.id}
        </TableCell>
        <TableCell component="th">
          <Typography
            variant="body2"
            minWidth={"5rem"}
            maxWidth={"12rem"}
            textOverflow={"ellipsis"}
            overflow={"hidden"}
          >
            {row.name}
          </Typography>
        </TableCell>
        <TableCell component="th" scope="row">
          <Box
            sx={{
              width: "64px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "8px",
              overflow: "hidden",

              "& img": {
                objectFit: "cover",
                objectPosition: "center",
                width: "100%",
              },
            }}
          >
            <Image
              src={imageUrl || "/assets/no-image.png"}
              alt={"..." + imageAltText?.slice(imageAltText?.length / 2)}
              width={64}
              height={44}
            />
          </Box>
        </TableCell>
        <TableCell component="th">
          <Typography
            variant="body1"
            maxWidth={"16rem"}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
            noWrap
            title={row.description}
          >
            {row.description}
          </Typography>
        </TableCell>
        <TableCell component="th">
          <Typography variant="body2">{row.categoryName}</Typography>
        </TableCell>
        <TableCell component="th" align="right" sx={{ width: "9rem" }}>
          {row.discount ? (
            <Chip label={`${row.discount}%`} variant="filled" color="primary" />
          ) : (
            <Typography variant="subtitle1">
              {mainTableTranslations.columns.discount.noDiscount}
            </Typography>
          )}
        </TableCell>
        <TableCell component="th" align="right">
          <Typography variant="button">
            {formatCurrency(row.price || 0)}
          </Typography>
        </TableCell>
        <TableCell component="th" align="right">
          <Typography variant="button">{row.quantity}</Typography>
        </TableCell>
        <TableCell component="th">{row.actionButtons}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 14, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Stack>
              <Typography variant="h6" gutterBottom>
                {mainTableTranslations.columns.actions.title}:
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: "1rem",
                  margin: "1rem 0",
                }}
              >
                <Button
                  LinkComponent={NextLink}
                  href={`${paths.dashboard.products.create}?id=${row.id}&update=1`}
                >
                  {mainTableTranslations.columns.actions.update}
                  <EditIcon />
                </Button>
                <LoadingButton
                  loading={isLoading}
                  color="error"
                  onClick={() => handleDeleteProduct(row.id, row.isActive)}
                >
                  {row.isActive
                    ? t(tokens.common.deactivateBtn)
                    : t(tokens.common.activeBtn)}
                  <DeleteForeverIcon />
                </LoadingButton>
              </Box>
            </Stack>
            <Box
              sx={{
                margin: 1,
                border: open
                  ? `4px solid ${theme.palette.secondary.main}`
                  : "transparent",
                borderBlock: "0px",
                borderRight: "0px",
                paddingLeft: open ? "1rem" : "0px",
              }}
            >
              <Table size="small" aria-label="parts">
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {row.partOptions?.partNumber}
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          width: "64px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "8px",
                          overflow: "hidden",

                          "& img": {
                            objectFit: "cover",
                            objectPosition: "center",
                            width: "100%",
                          },
                        }}
                      >
                        <Image
                          src={imageUrl || "/assets/no-image.png"}
                          alt={
                            "..." +
                            imageAltText?.slice(imageAltText?.length / 2)
                          }
                          width={64}
                          height={44}
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {/* End part */}
              {/* category */}
              <Typography
                variant="subtitle1"
                gutterBottom
                textTransform={"uppercase"}
                component="div"
              >
                {nestedTablesTranslations.category.title}
              </Typography>
              <Table size="small" aria-label="category">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      {nestedTablesTranslations.category.columns.id}
                    </TableCell>
                    <TableCell>
                      {nestedTablesTranslations.category.columns.categoryName}
                    </TableCell>
                    <TableCell>
                      {nestedTablesTranslations.category.columns.categoryType}
                    </TableCell>
                    <TableCell>
                      {nestedTablesTranslations.category.columns.questions}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {row.categoryOptions?.id}
                    </TableCell>
                    <TableCell>{row.categoryOptions?.name}</TableCell>
                    <TableCell>{row.categoryOptions.type}</TableCell>
                    <TableCell>
                      {parsedQA?.map((qa, idx) => (
                        <ul
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            flexWrap: "wrap",
                          }}
                          key={idx}
                        >
                          <li
                            style={{
                              flexBasis: "50%",
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <b>{`Q -${qa.question}`}</b>
                            <small>{`A -${qa.answer}`}</small>
                          </li>
                        </ul>
                      ))}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {/* End category */}
              {/* discount */}
              {row.discountOptions && (
                <>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    textTransform={"uppercase"}
                    component="div"
                  >
                    {nestedTablesTranslations.discount.title}
                  </Typography>
                  <Table size="small" aria-label="discount">
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          {nestedTablesTranslations.discount.columns.id}
                        </TableCell>
                        <TableCell>
                          {nestedTablesTranslations.discount.columns.name}
                        </TableCell>
                        <TableCell>
                          {
                            nestedTablesTranslations.discount.columns
                              .discountStatus
                          }
                        </TableCell>
                        <TableCell align="right">
                          {
                            nestedTablesTranslations.discount.columns
                              .discountPercentage
                          }
                        </TableCell>
                        <TableCell>
                          {
                            nestedTablesTranslations.discount.columns
                              .description
                          }
                        </TableCell>
                        <TableCell align="right">
                          {nestedTablesTranslations.discount.columns.startDate}
                        </TableCell>
                        <TableCell align="right">
                          {nestedTablesTranslations.discount.columns.endDate}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>{row.discountOptions?.id}</TableCell>
                        <TableCell>{row.discountOptions?.name}</TableCell>
                        <TableCell>
                          <Chip
                            size="small"
                            sx={{ paddingInline: "1rem" }}
                            label={
                              row.discountOptions?.active
                                ? "active"
                                : "disabled"
                            }
                            color={
                              row.discountOptions?.active ? "success" : "error"
                            }
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="button">
                            {row.discountOptions.discountPercentage}%
                          </Typography>
                        </TableCell>
                        <TableCell>{row.discountOptions.discription}</TableCell>
                        <TableCell align="right">
                          {dayjs(row.discountOptions.fromDate).format(
                            "DD MMM YYYY"
                          )}
                        </TableCell>
                        <TableCell align="right">
                          {dayjs(row.discountOptions.toDate).format(
                            "DD MMM YYYY"
                          )}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </>
              )}
              {/* End discount */}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
