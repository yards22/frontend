import { createContext, useContext } from "react";
import { ISimaraContext } from "./Interface";
import { DefaultSimaraThemeData } from "./ThemeData";

export const SimaraThemeContext = createContext<ISimaraContext>({
  themeData: DefaultSimaraThemeData,
});
export const useSimara = () => useContext(SimaraThemeContext).themeData;
