import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import { paths } from "../paths";
import { Issuer } from "../utils/auth";
import Cookies from "js-cookie";

const loginPaths = {
  [Issuer.Amplify]: paths.auth.amplify.login,
  [Issuer.Auth0]: paths.auth.auth0.login,
  [Issuer.Firebase]: paths.auth.firebase.login,
  [Issuer.JWT]: paths.auth.jwt.login,
};

export const AuthGuard = (props) => {
  const { children } = props;
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    const isAuthenticated = Boolean(Cookies.get("token"));
    if (!isAuthenticated) {
      // const searchParams = new URLSearchParams({
      //   returnTo: globalThis.location.href,
      // }).toString();
      // const href = loginPaths[issuer] + `?${searchParams}`;
      router.replace(paths.index);
    } else {
      setChecked(true);
    }
  }, [router]);

  // Only check on mount, this allows us to redirect the user manually when auth state changes
  useEffect(
    () => {
      check();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  if (!checked) {
    return null;
  }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // authenticated / authorized.

  return <>{children}</>;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};
