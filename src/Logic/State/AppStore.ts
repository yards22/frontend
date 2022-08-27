import { observable, action, runInAction, makeAutoObservable } from "mobx";

const THEME_KEY = "theme";

export default class AppStore {
  @observable theme: "light" | "dark" = "light";
  @observable isPhone: boolean = false;
  constructor() {
    makeAutoObservable(this);
  }

  @action
  setTheme = (theme: "light" | "dark") => {
    this.theme = theme;
    localStorage.setItem(THEME_KEY, theme);
  };

  @action
  setIsPhone = (isPhone: boolean) => {
    this.isPhone = isPhone;
  };
}
