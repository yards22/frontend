import { createContext, useContext } from "react";
import AppStore from "../State/AppStore";
import { AuthStore } from "../State/AuthStore";

interface IStoresContext {
  appStore: AppStore;
  authStore: AuthStore;
}

export const StoresContext = createContext<IStoresContext>(
  {} as IStoresContext
);

export const useStores = () => useContext(StoresContext);
