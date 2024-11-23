export const STATUS = {
  ACCEPT: "ACCEPT",
  PENDING: "PENDING",
  CANCELED: "CANCELED",
  REJECTED: "REJECTED",
  ALL: "ALL",
};
export const getQuotationStatusColor = (status) => {
  switch (status.toUpperCase()) {
    case STATUS.ACCEPT:
      return "#03C988";
    case STATUS.PENDING:
      return "#C69749";
    case STATUS.CANCELED:
      return "#F2613F";
    case STATUS.REJECTED:
      return "#A13333";
    default:
      return "#444444";
  }
};
