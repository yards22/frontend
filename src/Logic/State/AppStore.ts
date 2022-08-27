import { observable, action, runInAction, makeAutoObservable } from "mobx";

const THEME_KEY = "theme";

export default class AppStore {
  @observable theme: "light" | "dark" = "light";
  constructor() {
    makeAutoObservable(this);
  }

  @action
  setTheme = (theme: "light" | "dark") => {
    this.theme = theme;
    localStorage.setItem(THEME_KEY, theme);
  };
}
