import { useMutation } from "@tanstack/react-query";
import { PISTON_PRIVATE_INSTANCE } from "../api";
import { authService } from "../api/auth";
import Cookies from "js-cookie";
import { useRecoilState } from "recoil";
import { authAtom } from "../atoms/auth-atom";

const useGetGenerateOtp = () => {
  const {
    mutateAsync: generateOtpCode,
    isPending: isPendingGenerateOtp,
    isSuccess: isSuccessGenerateOtp,
    isError: isErrorGenerateOtp,
    error: errorGenerateOtp,
  } = useMutation({
    mutationFn: (phoneNumber) => authService.generateOtpCode(phoneNumber),
  });

  return {
    generateOtpCode,
    isPendingGenerateOtp,
    isSuccessGenerateOtp,
    isErrorGenerateOtp,
    errorGenerateOtp,
  };
};

const useSignUp = () => {
  const {
    mutateAsync: signUp,
    isPending: isPendingSignUp,
    isSuccess: isSuccessSignUp,
    isError: isErrorSignUp,
    error: errorSignUp,
  } = useMutation({
    mutationFn: (phoneNumber) => authService.signUp(phoneNumber),
  });

  return {
    signUp,
    isPendingSignUp,
    isSuccessSignUp,
    isErrorSignUp,
    errorSignUp,
  };
};

const useValidateOtp = () => {
  const [_, setAuthAtom] = useRecoilState(authAtom);

  const {
    mutateAsync: validateOtpCode,
    isPending: isPendingValidateOtp,
    isSuccess: isSuccessValidateOtp,
    isError: isErrorValidateOtp,
    error: errorValidateOtp,
  } = useMutation({
    mutationFn: ({ otp, phoneNumber }) =>
      authService.validateOtpCode({ otp, phoneNumber }),
    onSuccess: (res) => {
      PISTON_PRIVATE_INSTANCE.defaults.headers.common.Authorization =
        res.contentList?.[0];

      setAuthAtom((prevState) => ({
        ...prevState,
        isExpiredSessionDialog: false,
        isLoggedIn: true,
        loggedOut: false,
        token: res.contentList?.[0],
      }));
    },
  });

  return {
    validateOtpCode,
    isPendingValidateOtp,
    isSuccessValidateOtp,
    isErrorValidateOtp,
    errorValidateOtp,
  };
};

const useLogout = () => {
  const [_, setAuthAtom] = useRecoilState(authAtom);

  const { mutateAsync: logout, isPending: isLoggingOut } = useMutation({
    mutationFn: () => authService.signOut(),
    onSuccess: () => {
      Cookies.remove("token");
      Cookies.remove("OTP");
      setAuthAtom((prevState) => ({
        ...prevState,
        isExpiredSessionDialog: false,
        isLoggedIn: false,
        token: null,
        user: null,
        loggedOut: true,
      }));
    },
  });

  return { logout, isLoggingOut };
};

export { useGetGenerateOtp, useSignUp, useValidateOtp, useLogout };
