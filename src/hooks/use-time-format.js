import { useTranslation } from "react-i18next";

export const useTImeFormat = (dateTime) => {
  const [_, translate] = useTranslation();
  const options = {
    dateStyle: "medium",
    timeStyle: "short",
  };

  const formatDate = (value) =>
    Intl.DateTimeFormat(`${translate.language}-SA`, {
      timeStyle: "long",
      timeZone: "Asia/Riyadh",
    }).format(Date.parse(value));
  return { formatDate };
};
