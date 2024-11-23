import React from "react";
import { useTranslation } from "react-i18next";
import { tokens } from "../locales/tokens";

const useTranslateAppHeader = () => {
  const [t] = useTranslation();
  const translatedAppHeader = {
    accountPopover: {
      account: t(tokens.appHeader.accountPopover.account),
      settings: t(tokens.appHeader.accountPopover.settings),
      billing: t(tokens.appHeader.accountPopover.billing),
      logout: t(tokens.appHeader.accountPopover.logout),
    },
  };
  return { translatedAppHeader };
};

export default useTranslateAppHeader;
