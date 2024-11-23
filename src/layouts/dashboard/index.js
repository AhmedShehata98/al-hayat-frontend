import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { HorizontalLayout } from "./horizontal-layout";
import { VerticalLayout } from "./vertical-layout";
import { getSections } from "./config";
import SessionExpiredDialog from "../../libs/SessionExpiredDialog";
import useAppSettings from "../../hooks/use-app-settings";
import { getCookie } from "cookies-next";
import { useRecoilState } from "recoil";
import { authAtom } from "../../atoms/auth-atom";
import { useGeMeData } from "../../hooks/use-user";
import AuthLoader from "../../components/auth-loader";

const useTranslatedSections = () => {
  const { t } = useTranslation();

  return useMemo(() => getSections(t), [t]);
};

export const Layout = (props) => {
  const { settings } = useAppSettings();
  const sections = useTranslatedSections();
  const [auth, setAuthToken] = useRecoilState(authAtom);
  const token = getCookie("token");

  useGeMeData();

  useEffect(() => {
    if (token) {
      setAuthToken((prevState) => ({
        ...prevState,
        token,
      }));
    }
  }, [token, setAuthToken]);

  if (!auth.isLoggedIn && !auth.loggedOut) {
    return <AuthLoader />;
  }

  if (settings.layout === "horizontal") {
    return (
      <>
        <HorizontalLayout
          sections={sections}
          navColor={settings.navColor}
          {...props}
        />
        <SessionExpiredDialog />
      </>
    );
  }

  return (
    <>
      <VerticalLayout
        sections={sections}
        navColor={settings.navColor}
        {...props}
      />
      <SessionExpiredDialog />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};
