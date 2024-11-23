import React from "react";
import { useTranslation } from "react-i18next";

const useNumberFormat = () => {
  const [_, translate] = useTranslation();
  const options = { style: "currency", currency: "SAR" };
  const formatCurrency = (value) =>
    Intl.NumberFormat(`${translate.language}-SA`, options).format(value);
  return { formatCurrency };
};

export default useNumberFormat;
