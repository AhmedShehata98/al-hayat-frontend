import { atom } from "recoil";

export const authAtom = atom({
  key: `app-auth`,
  default: {
    isExpiredSessionDialog: false,
    user: null,
    token: null,
    loggedOut: false,
    isLoggedIn: false,
  },
});
