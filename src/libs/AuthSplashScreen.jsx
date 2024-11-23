import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { useDispatch, useSelector } from "../store";
import { SplashScreen } from "../components/splash-screen";
import { usePathname } from "next/navigation";
import { getMeThunk } from "../slices/users";
import Cookies from "js-cookie";
import { authActions } from "../slices/auth";
import { unwrapResult } from "@reduxjs/toolkit";

const AuthInitializeWrapper = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const pathname = usePathname();
  const dispatch = useDispatch();

  const handleSetMe = useCallback(
    (token) => {
      return dispatch(getMeThunk(token));
    },
    [dispatch]
  );

  const handleSetAuthenticated = useCallback(
    (isAuthenticated) => {
      dispatch(authActions.setAuthenticated({ isAuthenticated }));
    },
    [dispatch]
  );

  const handleReturnElements = useMemo(() => {
    if (pathname.includes("dashboard")) {
      return isAuthenticated ? children : <SplashScreen />;
    }
    return children;
  }, [pathname, isAuthenticated, children]);
  useEffect(() => {
    handleSetMe(Cookies.get("token"))
      .then(unwrapResult)
      .then((res) => {
        if (res.success === 200) {
          handleSetAuthenticated(true);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [handleSetMe, handleSetAuthenticated]);

  return handleReturnElements;
};

export default AuthInitializeWrapper;
