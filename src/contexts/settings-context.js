import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import PropTypes from "prop-types";
// @ts-ignore
import isEqual from "lodash.isequal";
import { useTranslation } from "react-i18next";

const STORAGE_KEY = "app.settings";

const storage = globalThis.localStorage;

const restoreSettings = () => {
  let value = null;

  try {
    const restored = storage.getItem(STORAGE_KEY);

    if (restored) {
      value = JSON.parse(restored);
    }
  } catch (err) {
    console.error(err);
    // If stored data is not a strigified JSON this will fail,
    // that's why we catch the error
  }

  return value;
};

const deleteSettings = () => {
  storage.removeItem(STORAGE_KEY);
};

const storeSettings = (value) => {
  storage.setItem(STORAGE_KEY, JSON.stringify(value));
};

const initialSettings = {
  colorPreset: "indigo",
  contrast: "normal",
  direction: "ltr",
  currentLang: "en",
  layout: "vertical",
  navColor: "evident",
  paletteMode: "light",
  responsiveFontSizes: true,
  stretch: false,
};

const initialState = {
  ...initialSettings,
  isInitialized: false,
  openDrawer: false,
};

export const SettingsContext = createContext({
  ...initialState,
  handleDrawerClose: () => {},
  handleDrawerOpen: () => {},
  handleReset: () => {},
  handleUpdate: () => {},
  handleChangeLanguage: () => {},
  isCustom: false,
});

export const SettingsProvider = (props) => {
  const { children } = props;
  const [state, setState] = useState(initialState);
  const [_, i18n] = useTranslation();

  const handleReset = useCallback(() => {
    deleteSettings();
    setState((prevState) => ({
      ...prevState,
      ...initialSettings,
    }));
  }, []);

  const handleUpdate = useCallback((settings) => {
    setState((prevState) => {
      storeSettings({
        colorPreset: prevState.colorPreset,
        contrast: prevState.contrast,
        direction: prevState.direction,
        layout: prevState.layout,
        navColor: prevState.navColor,
        paletteMode: prevState.paletteMode,
        responsiveFontSizes: prevState.responsiveFontSizes,
        stretch: prevState.stretch,
        ...settings,
      });

      return {
        ...prevState,
        ...settings,
      };
    });
  }, []);

  const handleDrawerOpen = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      openDrawer: true,
    }));
  }, []);

  const handleDrawerClose = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      openDrawer: false,
    }));
  }, []);

  const handleChangeLanguage = useCallback(
    async ({ language, dir }) => {
      handleUpdate({
        currentLang: language,
        direction: dir,
      });

      i18n.changeLanguage(language, (err) => {
        if (err) {
          console.error("Language change error happened: " + err);
        } else {
          if (language === "ar") {
            globalThis.document.documentElement.lang = "ar";
            globalThis.document.body.style.fontFamily =
              '"Alexandria",-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"';
          } else {
            globalThis.document.documentElement.lang = "en";
            globalThis.document.body.style.fontFamily =
              '"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"';
          }
        }
      });
    },
    [handleUpdate, i18n]
  );

  const isCustom = useMemo(() => {
    return !isEqual(initialSettings, {
      colorPreset: state.colorPreset,
      contrast: state.contrast,
      direction: state.direction,
      layout: state.layout,
      navColor: state.navColor,
      paletteMode: state.paletteMode,
      responsiveFontSizes: state.responsiveFontSizes,
      stretch: state.stretch,
    });
  }, [state]);

  useEffect(() => {
    const restored = restoreSettings();

    if (restored) {
      setState((prevState) => ({
        ...prevState,
        ...restored,
        isInitialized: true,
      }));

      // change language
      handleChangeLanguage({
        language: restored.currentLang || initialSettings.currentLang,
        dir: restored.direction || initialSettings.direction,
      });
    }
  }, [handleChangeLanguage]);

  return (
    <SettingsContext.Provider
      value={{
        ...state,
        handleDrawerClose,
        handleDrawerOpen,
        handleReset,
        handleUpdate,
        handleChangeLanguage,
        isCustom,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

SettingsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const SettingsConsumer = SettingsContext.Consumer;
