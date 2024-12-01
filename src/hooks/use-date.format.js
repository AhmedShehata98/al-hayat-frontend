import React from "react";
import { useTranslation } from "react-i18next";

const useDateFormat = () => {
  const [_, translate] = useTranslation();
  const options = {
    dateStyle: "medium",
    timeStyle: "short",
  };

  const formatDate = (value) =>
    Intl.DateTimeFormat(`${translate.language}-SA`, options).format(
      Date.parse(value)
    );
  const formatOnlyDate = (value) =>
    Intl.DateTimeFormat(`${translate.language}-SA`, {
      // dateStyle: "medium",
      weekday: "short",
      dayPeriod: "short",
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(Date.parse(value));
  return { formatDate, formatOnlyDate };
};

export default useDateFormat;
