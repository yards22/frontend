import React, { useEffect } from "react";
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
import { NotificationRepo } from "./Logic/Repository/NotificationRepo";
import { NotificationsProvider } from "@mantine/notifications";
import { PostStore } from "./Logic/State/PostStore";
import { PostRepo } from "./Logic/Repository/PostRepo";
import { MiscStore } from "./Logic/State/MiscStore";
import { MiscRepo } from "./Logic/Repository/MiscRepo";
import { NetworkStore } from "./Logic/State/NetworkStore";
import { NetworkRepo } from "./Logic/Repository/NetworkRepo";
import { CommentStore } from "./Logic/State/CommentStore";
import { CommentRepo } from "./Logic/Repository/CommentRepo";
import { InstantMatchStore } from "./Logic/State/InstantMatchStore";
import { InstantMatchRepo } from "./Logic/Repository/InstantMatchRepo";

interface ProvidedAppProps {
  children?: React.ReactNode;
}

const BASE_URL =
  "https://83libq0p22.execute-api.ap-south-1.amazonaws.com/stage/node";
const BASE_URL_FOR_IMAGES =
  "https://22yardz-stage-bucket.s3.ap-south-1.amazonaws.com/";

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
    new PostRepo(BASE_URL, BASE_URL_FOR_IMAGES, rq)
  );
  const miscStore = new MiscStore(new MiscRepo(BASE_URL + "/misc", rq));
  const networkStore = new NetworkStore(
    new NetworkRepo(BASE_URL, BASE_URL_FOR_IMAGES, rq)
  );
  const commentStore = new CommentStore(
    new CommentRepo(BASE_URL + "/comment", BASE_URL_FOR_IMAGES, rq),
    profileStore
  );

  const instantMatchStore = new InstantMatchStore(
    new InstantMatchRepo()
  )
  useEffect(() => {
    let interval: any;
    notificationStore.GetNotifications();
    interval = setInterval(() => {
      notificationStore.GetNotifications();
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <StoresContext.Provider
        value={{
          appStore,
          authStore,
          profileStore,
          notificationStore,
          postStore,
          miscStore,
          networkStore,
          commentStore,
          instantMatchStore
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
                      colors: {},
                      colorScheme: appStore.theme
                    }}
                  >
                    <NotificationsProvider
                      autoClose={2500}
                      position={
                        appStore.isPhone ? "top-center" : "bottom-right"
                      }
                      zIndex={2077}
                    >
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
