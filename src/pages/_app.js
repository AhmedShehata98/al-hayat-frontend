import { useEffect } from "react";
import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Toaster } from "../components/toaster";
import { gtmConfig } from "../config";
import { gtm } from "../libs/gtm";
import { createEmotionCache } from "../utils/create-emotion-cache";
import ReactQueryWrapper from "../libs/ReactQueryWrapper";
import SettingsWrapper from "../libs/SettingsWrapper";
import ThemeWrapper from "../libs/ThemeWrapper";
import RecoilProvider from "../libs/RecoilProvider";
import "../libs/nprogress";
import "../libs/mapbox";
import "../locales/i18n";

const clientSideEmotionCache = createEmotionCache();

const useAnalytics = () => {
  useEffect(() => {
    gtm.initialize(gtmConfig);
  }, []);
};

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  useAnalytics();

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Piston Dashboard</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ReactQueryWrapper>
        <RecoilProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <ThemeWrapper>
              <SettingsWrapper>
                {getLayout(<Component {...pageProps} />)}
                <Toaster />
                <CssBaseline />
              </SettingsWrapper>
            </ThemeWrapper>
          </LocalizationProvider>
        </RecoilProvider>
      </ReactQueryWrapper>
    </CacheProvider>
  );
};

export default App;
