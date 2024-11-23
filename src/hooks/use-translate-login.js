import React from "react";
import { useTranslation } from "react-i18next";
import { tokens } from "../locales/tokens";

const useTranslateLogin = () => {
  const [translate, options] = useTranslation();

  return {
    informationSectionHeadingTitle: translate(
      tokens.login.informationSection.headingTitle
    ),
    informationSectionDescription: translate(
      tokens.login.informationSection.description
    ),
    agreeCheckbox: translate(tokens.login.loginPanel.agreeCheckbox),
    code: translate(tokens.login.loginPanel.code),
    continueBtn: translate(tokens.login.loginPanel.continueBtn),
    LoginHeadingTitle: translate(tokens.login.loginPanel.headingTitle),
    logo: translate(tokens.login.loginPanel.logo),
    phoneNumberInput: translate(tokens.login.loginPanel.phoneNumberInput),
    sendCodeBtn: translate(tokens.login.loginPanel.sendCodeBtn),
    sendOtpBtnAgain: translate(tokens.login.loginPanel.sendOtpBtnAgain),
    options: {
      language: options.language,
    },
  };
};

export default useTranslateLogin;
