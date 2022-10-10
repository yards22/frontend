import { observable, action, makeAutoObservable } from "mobx";

const THEME_KEY = "theme";

export default class AppStore {
  @observable theme: "light" | "dark" = "light";
  @observable isPhone: boolean = false;
  @observable isTablet: boolean = false;
  @observable isDesktop: boolean = true;
  @observable navigationState: number = 0;
  @observable deviceWidth: number = 0;

  constructor() {
    makeAutoObservable(this);
    const expTheme = window.localStorage.getItem("theme") ?? "light";
    this.theme =
      expTheme === "light" || expTheme === "dark" ? expTheme : "light";
  }

  @action
  setTheme = (theme: "light" | "dark") => {
    this.theme = theme;
    localStorage.setItem(THEME_KEY, theme);
  };

  @action
  setIsPhone = (isPhone: boolean) => {
    this.isPhone = isPhone;
    this.isTablet = false;
    this.isDesktop = false;
  };

  @action
  setIsTablet = (isTablet: boolean) => {
    this.isTablet = isTablet;
    this.isPhone = false;
    this.isDesktop = false;
  };

  @action
  setIsDesktop = (isDesktop: boolean) => {
    this.isDesktop = isDesktop;
    this.isPhone = false;
    this.isTablet = false;
  };

  @action
  setNavigationState = (state: number) => {
    this.navigationState = state;
  };

  @action
  setDeviceWidth = (state: number) => {
    this.deviceWidth = state;
  };
}
