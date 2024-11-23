import React from "react";
import { useTranslation } from "react-i18next";
import { tokens } from "../locales/tokens";

const useTranslateAccount = () => {
  const [t] = useTranslation();
  const translatedAccount = {
    headingTitle: t(tokens.account.headingTitle),
    tabs: {
      general: t(tokens.account.tabs.general),
    },
    profile: {
      headingTitle: t(tokens.account.profile.headingTitle),
      firstName: t(tokens.account.profile.firstName),
      lastName: t(tokens.account.profile.lastName),
      username: t(tokens.account.profile.username),
      email: t(tokens.account.profile.email),
      phone: t(tokens.account.profile.phone),
      avatar: t(tokens.account.profile.avatar),
    },
    // address: t(tokens.account.profile.address),
    // city: t(tokens.account.profile.city),
    // state: t(tokens.account.profile.state),
    // country: t(tokens.account.profile.country),
    // zipCode: t(tokens.account.profile.zipCode),
    actions: {
      update: t(tokens.account.actions.update),
      cancel: t(tokens.account.actions.cancel),
      saveChanges: t(tokens.account.actions.saveChanges),
    },
  };
  return { translatedAccount };
};

export default useTranslateAccount;
