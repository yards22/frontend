import { action, makeAutoObservable, observable } from "mobx";
import { MAuth } from "../Model/MAuth";
import { AuthRepo } from "../Repository/AuthRepo";
const TOKEN_KEY = "token";

export class AuthStore {
  @observable user: MAuth | null = null;
  @observable isLoading: boolean = false;
  @observable token: string | null = null;
  authRepo: AuthRepo;
  constructor(authRepo: AuthRepo) {
    makeAutoObservable(this);
    this.authRepo = authRepo;
    this.token = window.localStorage.getItem("token");
  }

  @action
  CheckIfLogin = async () => {
    this.isLoading = true;
    try {
      const { user_data } = await this.authRepo.me(this.token || "");
      this.user = user_data;
    } catch (err) {
    } finally {
      this.isLoading = false;
    }
  };

  @action
  SetToken = (token: string | null) => {
    let validToken: string | null = null;
    if (!token) validToken = null;
    else if (token !== "") validToken = token;
    if (validToken) window.localStorage.setItem(TOKEN_KEY, validToken);
    else window.localStorage.removeItem(TOKEN_KEY);
    this.token = validToken;
  };

  @action
  LoginUser = async (mail_id: string, password: string) => {
    this.isLoading = true;
    try {
      const { user_data, token } = await this.authRepo.login(mail_id, password);
      this.user = user_data;
      this.SetToken(token);
    } catch (err) {
    } finally {
      this.isLoading = false;
    }
  };

  @action
  LogoutUser = async () => {
    this.isLoading = true;
    try {
      await this.authRepo.logout(this.token || "");
      this.user = null;
      this.SetToken(null);
    } catch (err) {
    } finally {
      this.isLoading = false;
    }
  };
}
