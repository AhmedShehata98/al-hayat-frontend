import { atom, selector } from "recoil";
import isEqual from "lodash.isequal";

export const initialSettings = {
  colorPreset: "indigo",
  contrast: "normal",
  direction: "ltr",
  currentLang: "en",
  layout: "vertical",
  navColor: "evident",
  paletteMode: "light",
  responsiveFontSizes: true,
  stretch: false,
  isCustom: false,
};

const initialState = {
  ...initialSettings,
  isInitialized: false,
  openDrawer: false,
};
export const settingsAtom = atom({
  key: `app-settings`,
  default: initialState,
});
