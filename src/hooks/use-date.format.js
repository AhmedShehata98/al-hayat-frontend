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
  return { formatDate };
};

export default useDateFormat;