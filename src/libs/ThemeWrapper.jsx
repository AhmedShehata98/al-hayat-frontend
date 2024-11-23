import { ThemeProvider } from "@mui/material/styles";
import Head from "next/head";
import React, { useMemo } from "react";
import { createTheme } from "../theme";
import { useRecoilValue } from "recoil";
import { settingsAtom } from "../atoms/settings-atom";

const ThemeWrapper = ({ children }) => {
  const { colorPreset, contrast, direction, paletteMode, responsiveFontSizes } =
    useRecoilValue(settingsAtom);

  const theme = createTheme({
    colorPreset,
    contrast,
    direction,
    paletteMode,
    responsiveFontSizes,
  });

  return (
    <>
      <Head>
        {/* <meta name="color-scheme" content={settings.paletteMode} /> */}
        <meta name="color-scheme" content={paletteMode} />
        <meta name="theme-color" content={theme.palette.neutral[900]} />
      </Head>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  );
};

export default React.memo(ThemeWrapper);
