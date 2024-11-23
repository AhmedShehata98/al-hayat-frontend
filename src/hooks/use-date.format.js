import React from "react";
import { useTranslation } from "react-i18next";

const useDateFormat = () => {
  const [_, translate] = useTranslation();
  const options = {};

  const formatDate = (value) =>
    Intl.DateTimeFormat(`${translate.language}-SA`, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(Date.parse(value));
  return { formatDate };
};

export default useDateFormat;
