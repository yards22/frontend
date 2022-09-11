import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import Head from "next/head";
import { StoresContext } from "../src/Logic/Providers/StoresProviders";
import { MantineProvider } from "@mantine/core";
import AppStore from "../src/Logic/State/AppStore";
import { Observer } from "mobx-react-lite";
import { useEffect } from "react";
import "../src/Global/style.css";
import { AuthStore } from "../src/Logic/State/AuthStore";
import { Request } from "../src/Logic/Utils/Fetch";
import { AuthRepo } from "../src/Logic/Repository/AuthRepo";
import { useRouter } from "next/router";
function MyApp({ Component, pageProps }: AppProps) {
  const rq = new Request({ "Content-Type": "application/json" });
  const appStore = new AppStore();
  const authStore = new AuthStore(
    new AuthRepo("http://localhost:4000/auth", rq)
  );
  const router = useRouter();
  useEffect(() => {
    const expTheme = window.localStorage.getItem("theme") ?? "light";
    appStore.setTheme(
      expTheme == "light" || expTheme == "dark" ? expTheme : "light"
    );
    appStore.setIsPhone(window.innerWidth < 700);

    const token = window.localStorage.getItem("token");
    authStore.SetToken(token);

    if (token) {
      authStore.CheckIfLogin();
    }

    if (authStore.user) {
      router.push("/profile");
    }
  }, [router]);
  return (
    <StoresContext.Provider value={{ appStore, authStore }}>
      {
        <Observer>
          {() => {
            return (
              <ThemeProvider theme={{}}>
                <MantineProvider
                  withGlobalStyles
                  withNormalizeCSS
                  theme={{
                    colors: {
                      // brand: [
                      //   "#6698fe",
                      //   "#4d87fe",
                      //   "#3375fe",
                      //   "#1a64fe",
                      //   "#0053fe",
                      //   "#004be5",
                      //   "#0042cb",
                      //   "#003ab2",
                      //   "#003298",
                      //   "#002a7f",
                      // ],
                    },
                    // primaryColor: "brand",
                    // primaryShade: { light: 4, dark: 3 },
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
