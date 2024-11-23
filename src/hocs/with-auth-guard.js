import { useRecoilState } from "recoil";
import { AuthGuard } from "../guards/auth-guard";
import { authAtom } from "../atoms/auth-atom";
import { useCallback } from "react";
import AuthLoader from "../components/auth-loader";

export const withAuthGuard = (Component) => (props) => {
  return (
    <AuthGuard>
      <Component {...props} />
    </AuthGuard>
  );
};
