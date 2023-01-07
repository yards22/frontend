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
import { NotificationRepo } from "./Logic/Repository/NotificationRepo";
import { NotificationsProvider } from "@mantine/notifications";
import { PostStore } from "./Logic/State/PostStore";
import { PostRepo } from "./Logic/Repository/PostRepo";
import { MiscStore } from "./Logic/State/MiscStore";
import { MiscRepo } from "./Logic/Repository/MiscRepo";

interface ProvidedAppProps {
  children?: React.ReactNode;
}

const BASE_URL = "http://localhost:4000";
const BASE_URL_FOR_IMAGES =
  "https://22yards-image-bucket.s3.ap-south-1.amazonaws.com/";

function ProvidedApp(props: ProvidedAppProps) {
  const rq = new Request({ "Content-Type": "application/json" });
  const appStore = new AppStore();
  const authStore = new AuthStore(new AuthRepo(BASE_URL + "/auth", rq));
  const profileStore = new ProfileStore(
    new ProfileRepo(BASE_URL + "/profile", BASE_URL_FOR_IMAGES, rq)
  );
  const notificationStore = new NotificationStore(
    new NotificationRepo(BASE_URL + "/notification", rq)
  );
  const postStore = new PostStore(
    new PostRepo(BASE_URL + "/post", BASE_URL_FOR_IMAGES, rq)
  );
  const exploreStore = new ExploreStore(
    new ExploreRepo(BASE_URL + "/network", rq)
  );
  const miscStore = new MiscStore(new MiscRepo(BASE_URL + "/misc", rq));
  return (
    <div
      style={
        {
          // backgroundColor: "#E7F5FF",
        }
      }
    >
      <StoresContext.Provider
        value={{
          appStore,
          authStore,
          profileStore,
          notificationStore,
          exploreStore,
          postStore,
          miscStore,
        }}
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
                    <NotificationsProvider position="top-right" zIndex={2077}>
                      {props.children}
                    </NotificationsProvider>
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
