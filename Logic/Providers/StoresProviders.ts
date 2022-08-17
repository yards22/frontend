import { createContext, useContext } from "react";
import { TodoStore } from "../State/TodoStore";

interface IStoresContext {
  todoStore: TodoStore;
}

export const StoresContext = createContext<IStoresContext>(
  {} as IStoresContext
);

export const useStores = () => useContext(StoresContext);
