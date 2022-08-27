import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import Head from "next/head";
import {
  StoresContext,
  useStores,
} from "../src/Logic/Providers/StoresProviders";
import { MantineProvider } from "@mantine/core";
import AppStore from "../src/Logic/State/AppStore";
import { Observer, observer } from "mobx-react-lite";
import { useEffect } from "react";
function MyApp({ Component, pageProps }: AppProps) {
  const appStore = new AppStore();
  useEffect(() => {
    const expTheme = window.localStorage.getItem("theme") ?? "light";
    appStore.setTheme(
      expTheme == "light" || expTheme == "dark" ? expTheme : "light"
    );
  }, []);
  return (
    <StoresContext.Provider value={{ appStore }}>
      {
        <Observer>
          {() => {
            return (
              <ThemeProvider theme={{}}>
                <MantineProvider
                  withGlobalStyles
                  withNormalizeCSS
                  theme={{
                    colorScheme: appStore.theme,
                  }}
                >
                  <Head>
                    <meta name="theme-color" content="#121827" />
                  </Head>
                  <Component {...pageProps} />
                </MantineProvider>
              </ThemeProvider>
            );
          }}
        </Observer>
      }
    </StoresContext.Provider>
  );
}
export default MyApp;
