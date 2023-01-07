import { createContext, useContext } from "react";
import AppStore from "../State/AppStore";
import { AuthStore } from "../State/AuthStore";
import { ExploreStore } from "../State/ExploreStore";
import { NotificationStore } from "../State/NotificationStore";
import { PostStore } from "../State/PostStore";
import { ProfileStore } from "../State/ProfileStore";

interface IStoresContext {
  appStore: AppStore;
  authStore: AuthStore;
  profileStore: ProfileStore;
  notificationStore: NotificationStore;
  exploreStore: ExploreStore;
  postStore: PostStore;
}

export const StoresContext = createContext<IStoresContext>(
  {} as IStoresContext
);

export const useStores = () => useContext(StoresContext);
