import React from "react";
import { useTranslation } from "react-i18next";
import { tokens } from "../locales/tokens.js";

function useTranslateNetworkMessages() {
  const translation = useTranslation();
  const t = translation.t;

  return {
    currentLang: translation.i18n.language,
    serverError: {
      title: t(tokens.networkMessages.serverError.title),
      message: t(tokens.networkMessages.serverError.message),
    },
    noFoundResources: {
      title: t(tokens.networkMessages.noFoundResources.title),
      message: t(tokens.networkMessages.noFoundResources.message),
    },
    somethingWentWrong: {
      title: t(tokens.networkMessages.somethingWentWrong.title),
      message: t(tokens.networkMessages.somethingWentWrong.message),
    },
  };
}

export default useTranslateNetworkMessages;
