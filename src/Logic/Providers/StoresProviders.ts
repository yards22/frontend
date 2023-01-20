import { createContext, useContext } from "react";
import AppStore from "../State/AppStore";
import { AuthStore } from "../State/AuthStore";
import { CommentStore } from "../State/CommentStore";
import { MiscStore } from "../State/MiscStore";
import { NetworkStore } from "../State/NetworkStore";
import { NotificationStore } from "../State/NotificationStore";
import { PostStore } from "../State/PostStore";
import { ProfileStore } from "../State/ProfileStore";

interface IStoresContext {
  appStore: AppStore;
  authStore: AuthStore;
  profileStore: ProfileStore;
  notificationStore: NotificationStore;
  postStore: PostStore;
  miscStore: MiscStore;
  networkStore: NetworkStore;
  commentStore: CommentStore;
}

export const StoresContext = createContext<IStoresContext>(
  {} as IStoresContext
);

export const useStores = () => useContext(StoresContext);
