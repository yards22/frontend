import React from "react";
import { StoresContext } from "./Logic/Providers/StoresProviders";
import { AuthRepo } from "./Logic/Repository/AuthRepo";
import AppStore from "./Logic/State/AppStore";
import { AuthStore } from "./Logic/State/AuthStore";
import { ThemeProvider } from "styled-components";
import { MantineProvider } from "@mantine/core";
import { Observer } from "mobx-react-lite";
import { Request } from "./Logic/Utils/Fetch";
import { ProfileRepo } from "./Logic/Repository/ProfileRepo";
import { ProfileStore } from "./Logic/State/ProfileStore";
import { NotificationStore } from "./Logic/State/NotificationStore";
import { ExploreStore } from "./Logic/State/ExploreStore";
import { ExploreRepo } from "./Logic/Repository/ExploreRepo";

interface ProvidedAppProps {
  children?: React.ReactNode;
}

function ProvidedApp(props: ProvidedAppProps) {
  const rq = new Request({ "Content-Type": "application/json" });
  const appStore = new AppStore();
  const authStore = new AuthStore(
    new AuthRepo("http://localhost:4000/auth", rq)
  );
  const profileStore = new ProfileStore(
    new ProfileRepo("http://localhost:4000/profile", rq)
  );
  const notificationStore = new NotificationStore();

  const exploreStore = new ExploreStore(
    new ExploreRepo("http://localhost:4000/network",rq)
  );
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
      }}
    >
      <StoresContext.Provider
        value={{ appStore, authStore, profileStore, notificationStore,exploreStore }}
      >
        {
          <Observer>
            {() => {
              return (
                <ThemeProvider theme={{}}>
                  <MantineProvider
                    withGlobalStyles
                    withNormalizeCSS
                    theme={{
                      loader: "dots",
                      colors: {},
                      colorScheme: appStore.theme,
                    }}
                  >
                    {props.children}
                  </MantineProvider>
                </ThemeProvider>
              );
            }}
          </Observer>
        }
      </StoresContext.Provider>
    </div>
  );
}

export default ProvidedApp;
