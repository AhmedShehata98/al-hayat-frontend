import React from "react";
import { useTranslation } from "react-i18next";
import { tokens } from "../locales/tokens";

const useTranslateToast = () => {
  const [t] = useTranslation();
  const translatedToast = {
    createMsg: t(tokens.toastMessages.createMsg),
    updateMsg: t(tokens.toastMessages.updateMsg),
    deleteMsg: t(tokens.toastMessages.deleteMsg),
    updateUser: t(tokens.toastMessages.updateUser),
    deleteUser: t(tokens.toastMessages.deleteUser),
    createUser: t(tokens.toastMessages.createUser),
    otpSend: t(tokens.toastMessages.otpSend),
    login: t(tokens.toastMessages.login),
    logout: t(tokens.toastMessages.logout),
    updateProfile: t(tokens.toastMessages.updateProfile),
    otpResend: t(tokens.toastMessages.otpResend),
    errorMsg: t(tokens.toastMessages.errorMsg),
    orderCancelError: t(tokens.toastMessages.orderCancelError),
    orderCancelSuccess: t(tokens.toastMessages.orderCancelSuccess),
    assignScheduledOrders: t(tokens.toastMessages.assignScheduledOrders),
    languageChanged: t(tokens.common.languageChanged),
    partMatchMsg: t(tokens.toastMessages.partMatchMsg),
    partNotMatchMsg: t(tokens.toastMessages.partNotMatchMsg),
  };
  return translatedToast;
};

export default useTranslateToast;
