import { useCallback, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import {
  Button,
  Typography,
  Stack,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import PropTypes from "prop-types";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { LoadingButton } from "@mui/lab";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import toast from "react-hot-toast";
import useTranslateCoupon from "../../../hooks/use-translate-coupon";
import useDateFormat from "../../../hooks/use-date.format";
import useNumberFormat from "../../../hooks/use-number-format";
import { COUPON_TYPES } from "../../../utils/coupon-helpers";
import { useDeleteCoupon } from "../../../hooks/use-coupon";
import useSnackbar from "../../../hooks/use-snackbar";

const CouponCard = ({ coupon, onUpdate, ...props }) => {
  const {
    translateCoupon: { card: cardTranslation },
  } = useTranslateCoupon();
  const { formatCurrency } = useNumberFormat();
  const { formatDate } = useDateFormat();
  const [expandText, setExpandText] = useState(false);
  const { deleteCoupon, isPendingDeleteCoupon } = useDeleteCoupon();

  const {
    id: couponId,
    name,
    discription: description,
    percentage,
    active,
    fromDate,
    toDate,
    numberOfTimes,
    voucherId,
    numberUsed: numberOfUsed,
    maxAmount,
    couponType,
  } = coupon;

  const {
    anchorOrigin,
    handleCloseSnackbar,
    handleOpenSnackbar,
    openSnackbar,
    translatedToast,
    autoHideDuration,
  } = useSnackbar();

  const couponTypeMap =
    cardTranslation.couponsCard.couponType[
      COUPON_TYPES.get(couponType).toLowerCase().replace(" ", "-")
    ];

  const handleCopy = async (voucherId) => {
    try {
      await globalThis.navigator.clipboard.writeText(voucherId);
      toast.success("coupon copied successfully");
    } catch (error) {
      console.error(error);
      toast.error("error occurred when copy coupon");
    }
  };

  const handleDeleteCoupon = useCallback(async () => {
    try {
      await deleteCoupon(coupon.id);
      handleOpenSnackbar({
        message: translatedToast.deleteMsg.replace("@", `#${coupon.name}`),
      });
    } catch (error) {
      handleOpenSnackbar({
        message: translatedToast.errorMsg,
        security: "error",
      });
      console.error(error);
    }
  }, [deleteCoupon, handleOpenSnackbar, translatedToast, coupon]);

  return (
    <Card {...props}>
      <CardContent
        sx={{
          paddingBottom: "1rem",
        }}
      >
        <Stack
          justifyContent={"space-between"}
          alignItems={"center"}
          flexDirection={"row"}
          gap={"2rem"}
        >
          <Typography
            gutterBottom
            lineHeight={"1.2rem"}
            variant="overline"
            component="div"
          >
            {name}
          </Typography>
          <Box
            sx={{
              width: "1rem",
              height: "1rem",
              display: "inline-block",
              borderRadius: "50%",
              flexShrink: 0,
            }}
            bgcolor={active ? "#49CC90" : "#F93E3E"}
          ></Box>
        </Stack>
        <Stack alignItems={"flex-start"}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              maxHeight: expandText ? "auto" : "2.3rem",
              lineHeight: "1rem",
              fontSize: "12px",
              overflowY: "hidden",
            }}
          >
            {description}
          </Typography>
          <Button
            size="small"
            variant="text"
            color="secondary"
            onClick={() => setExpandText((p) => !p)}
          >
            {expandText ? "show less" : "show more"}
          </Button>
        </Stack>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            marginTop: "0.5rem",
            gap: "1rem",
          }}
        >
          <Typography
            color={"primary"}
            variant="caption"
            title={voucherId}
            sx={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              textWrap: "nowrap",
            }}
          >
            {voucherId}
          </Typography>
          <Button size="small" onClick={() => handleCopy(voucherId)}>
            <ContentCopyIcon color="success" fontSize="22px" />
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            marginTop: "1rem",
          }}
        >
          <LocalOfferIcon color="success" />
          <Typography variant="body1" color="text.secondary" marginX={"0.5rem"}>
            {parseFloat(percentage).toFixed(0) + "%"}
          </Typography>
        </Box>
      </CardContent>
      <Stack>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography variant="overline">
              {cardTranslation.couponsCard.dateTitle}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack>
              <Stack flexDirection={"row"} alignItems={"center"} gap="1rem">
                <Typography variant="subtitle2">Start date:</Typography>
                <Typography variant="caption">
                  {formatDate(fromDate)}
                </Typography>
              </Stack>
              <Stack flexDirection={"row"} alignItems={"center"} gap="1rem">
                <Typography variant="subtitle2">End date:</Typography>
                <Typography variant="caption">{formatDate(toDate)}</Typography>
              </Stack>
            </Stack>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography variant="overline">
              {cardTranslation.couponsCard.statisticsTitle}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack>
              <Stack flexDirection={"row"} alignItems={"center"} gap="1rem">
                <Typography variant="subtitle2">
                  {cardTranslation.couponsCard.numberOfTimes}
                </Typography>
                <Typography variant="caption">{numberOfTimes}</Typography>
              </Stack>
              <Stack flexDirection={"row"} alignItems={"center"} gap="1rem">
                <Typography variant="subtitle2">
                  {cardTranslation.couponsCard.numberOfUsed}
                </Typography>
                <Typography variant="caption">{numberOfUsed}</Typography>
              </Stack>
              <Stack flexDirection={"row"} alignItems={"center"} gap="1rem">
                <Typography variant="subtitle2">
                  {cardTranslation.couponsCard.maxAmount}:
                </Typography>
                <Typography variant="caption">
                  {formatCurrency(maxAmount || 0)}
                </Typography>
              </Stack>
              <Stack flexDirection={"row"} alignItems={"center"} gap="1rem">
                <Typography variant="subtitle2">
                  {cardTranslation.couponsCard.couponType.title}
                </Typography>
                <Typography variant="caption">{couponTypeMap}</Typography>
              </Stack>
            </Stack>
          </AccordionDetails>
        </Accordion>
      </Stack>
      <CardActions>
        <LoadingButton
          size="small"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={handleDeleteCoupon}
          loading={isPendingDeleteCoupon}
        >
          {cardTranslation.couponsCard.actions.delete}
        </LoadingButton>
        <Button size="small" startIcon={<EditIcon />} onClick={onUpdate}>
          {cardTranslation.couponsCard.actions.edit}
        </Button>
      </CardActions>
    </Card>
  );
};

export default CouponCard;

CouponCard.propTypes = {
  coupon: {
    name: PropTypes.string.isRequired,
    discription: PropTypes.string.isRequired,
    percentage: PropTypes.number.isRequired,
    active: PropTypes.bool.isRequired,
    fromDate: PropTypes.string.isRequired,
    toDate: PropTypes.string.isRequired,
    numberOfTimes: PropTypes.number.isRequired,
    numberUsed: PropTypes.number.isRequired,
    maxAmount: PropTypes.number.isRequired,
    couponType: PropTypes.number.isRequired,
  },
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
