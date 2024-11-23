import { useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { settingsAtom, initialSettings } from "../atoms/settings-atom";
import isEqual from "lodash.isequal";

const useAppSettings = () => {
  const [settings, setSettings] = useRecoilState(settingsAtom);
  const [_, i18n] = useTranslation();
  const storage = globalThis.localStorage;
  const STORAGE_KEY = "app.settings";
  const isCustom = useMemo(() => {
    return !isEqual(initialSettings, {
      colorPreset: settings.colorPreset,
      contrast: settings.contrast,
      direction: settings.direction,
      layout: settings.layout,
      navColor: settings.navColor,
      paletteMode: settings.paletteMode,
      responsiveFontSizes: settings.responsiveFontSizes,
      stretch: settings.stretch,
    });
  }, [settings]);

  const storeSettings = useCallback(
    (state, newSettings) => {
      try {
        storage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            ...state,
            ...newSettings,
          })
        );
      } catch (err) {
        console.error("Error storing settings:", err);
      }
    },
    [storage]
  );

  const removeSettings = useCallback(() => {
    try {
      storage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error("Error removing settings:", err);
    }
  }, [storage]);

  const restoreSettings = useCallback(() => {
    try {
      const restored = storage.getItem(STORAGE_KEY);
      return restored ? JSON.parse(restored) : null;
    } catch (err) {
      console.error("Error restoring settings:", err);
      return null;
    }
  }, [storage]);

  const handleUpdate = useCallback(
    (newSettings) => {
      setSettings((prevState) => {
        const updatedSettings = {
          ...prevState,
          ...newSettings,
        };

        storeSettings({
          colorPreset: prevState.colorPreset,
          contrast: prevState.contrast,
          direction: prevState.direction,
          layout: prevState.layout,
          navColor: prevState.navColor,
          paletteMode: prevState.paletteMode,
          responsiveFontSizes: prevState.responsiveFontSizes,
          stretch: prevState.stretch,
          ...newSettings,
        });
        return updatedSettings;
      });
    },
    [setSettings, storeSettings]
  );

  const changeDomLanguageAttrib = useCallback((language) => {
    const htmlElement = globalThis.document.documentElement;
    const bodyElement = globalThis.document.body;

    if (language === "ar") {
      htmlElement.lang = "ar";
      bodyElement.style.fontFamily =
        '"Alexandria",-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"';
    } else {
      htmlElement.lang = "en";
      bodyElement.style.fontFamily =
        '"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"';
    }
  }, []);

  const handleChangeLanguage = useCallback(
    ({ language, dir }) => {
      try {
        handleUpdate({ currentLang: language, direction: dir });
        i18n.changeLanguage(language, (err) => {
          if (err) {
            console.error("Language change error:", err);
          } else {
            changeDomLanguageAttrib(language);
          }
        });
      } catch (error) {
        console.error("handle Change Language fn error", error);
      }
    },
    [i18n, handleUpdate, changeDomLanguageAttrib]
  );

  const handleResetSettings = useCallback(() => {
    setSettings(initialSettings);
    removeSettings();
  }, [removeSettings, setSettings]);

  const handleDrawerOpen = useCallback(() => {
    setSettings((prevState) => ({
      ...prevState,
      openDrawer: true,
    }));
  }, [setSettings]);

  const handleDrawerClose = useCallback(() => {
    setSettings((prevState) => ({
      ...prevState,
      openDrawer: false,
    }));
  }, [setSettings]);

  const handleInitializationSettings = useCallback(
    (isInitialized) => {
      setSettings((prevState) => ({
        ...prevState,
        isInitialized,
      }));
    },
    [setSettings]
  );

  useEffect(() => {
    const restored = restoreSettings();
    if (restored) {
      handleUpdate({
        ...restored,
        isInitialized: true,
      });

      // change language
      handleChangeLanguage({
        language: restored.currentLang || initialSettings.currentLang,
        dir: restored.direction || initialSettings.direction,
      });
    }
  }, [handleChangeLanguage, handleUpdate, restoreSettings]);

  return {
    isCustom,
    settings,
    handleUpdate,
    handleChangeLanguage,
    handleDrawerOpen,
    handleDrawerClose,
    handleResetSettings,
    handleInitializationSettings,
  };
};

export default useAppSettings;
