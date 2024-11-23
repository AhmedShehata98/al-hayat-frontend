import React from "react";
import useAppSettings from "../hooks/use-app-settings";
import { SettingsDrawer } from "../components/settings-drawer";
import { SettingsButton } from "../components/settings-button";
import { RTL } from "../components/rtl";

const SettingsWrapper = ({ children }) => {
  const {
    settings,
    handleDrawerClose,
    handleDrawerOpen,
    handleUpdate,
    handleResetSettings,
  } = useAppSettings();

  return (
    <RTL direction={settings.direction}>
      <SettingsButton onClick={handleDrawerOpen} />
      <SettingsDrawer
        canReset={settings.isCustom}
        onClose={handleDrawerClose}
        onReset={handleResetSettings}
        onUpdate={handleUpdate}
        open={settings.openDrawer}
        values={{
          colorPreset: settings.colorPreset,
          contrast: settings.contrast,
          direction: settings.direction,
          paletteMode: settings.paletteMode,
          responsiveFontSizes: settings.responsiveFontSizes,
          stretch: settings.stretch,
          layout: settings.layout,
          navColor: settings.navColor,
        }}
      />
      {children}
    </RTL>
  );
};

export default React.memo(SettingsWrapper);
