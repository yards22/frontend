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
  SetUser = (user: MAuth | null) => {
    this.user = user;
  };

  @action
  SetLoading = (v: boolean) => {
    this.isLoading = v;
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
  CheckIfLogin = async () => {
    this.SetLoading(true);
    try {
      const { user_data } = await this.authRepo.me(this.token || "");
      this.SetUser(user_data);
    } catch (err) {
      throw err;
    } finally {
      this.SetLoading(false);
    }
  };

  @action
  LoginUser = async (mail_id: string, password: string) => {
    this.SetLoading(true);
    try {
      const { user_data, token } = await this.authRepo.login(mail_id, password);
      this.SetUser(user_data);
      this.SetToken(token);
    } catch (err) {
      throw err;
    } finally {
      this.SetLoading(false);
    }
  };

  @action
  OAuthLoginUser = async (id_token: string) => {
    this.SetLoading(true);
    try {
      const { user_data, token } = await this.authRepo.oauthLogin(id_token);
      this.SetUser(user_data);
      this.SetToken(token);
    } catch (err) {
      throw err;
    } finally {
      this.SetLoading(false);
    }
  };

  @action
  LogoutUser = async () => {
    this.SetLoading(true);
    try {
      await this.authRepo.logout(this.token || "");
      this.SetUser(null);
      this.SetToken(null);
    } catch (err) {
      throw err;
    } finally {
      this.SetLoading(false);
    }
  };

  @action
  SignUpUser = async (mail_id: string, password: string, otp: string) => {
    this.SetLoading(true);
    try {
      const { user_data, token } = await this.authRepo.signUp(
        mail_id,
        password,
        otp
      );
      this.SetUser(user_data);
      this.SetToken(token);
    } catch (err) {
    } finally {
      this.SetLoading(false);
    }
  };

  @action
  UpdatePassword = async (mail_id: string, password: string, otp: string) => {
    this.SetLoading(true);
    try {
      const { user_data, token } = await this.authRepo.updatePassword(
        mail_id,
        password,
        otp
      );
      this.SetUser(user_data);
      this.SetToken(token);
    } catch (err) {
      throw err;
    } finally {
      this.SetLoading(false);
    }
  };

  @action
  SendSignUpOTP = async (mail_id: string) => {
    this.SetLoading(true);
    try {
      await this.authRepo.sendSignUpOTP(mail_id);
    } catch (err) {
      throw err;
    } finally {
      this.SetLoading(false);
    }
  };

  @action
  VerifySignUpOTP = async (mail_id: string, otp: string) => {
    this.SetLoading(true);
    try {
      return this.authRepo.verifySignUpOTP(mail_id, otp);
    } catch (err) {
      throw err;
    } finally {
      this.SetLoading(false);
    }
  };

  @action
  SendForgotPasswordOTP = async (mail_id: string) => {
    this.SetLoading(true);
    try {
      await this.authRepo.sendForgotPasswordOTP(mail_id);
    } catch (err) {
      throw err;
    } finally {
      this.SetLoading(false);
    }
  };

  @action
  VerifyForgotPasswordOTP = async (mail_id: string, otp: string) => {
    this.SetLoading(true);
    try {
      await this.authRepo.verifyForgotPasswordOTP(mail_id, otp);
    } catch (err) {
      throw err;
    } finally {
      this.SetLoading(false);
    }
  };
}
