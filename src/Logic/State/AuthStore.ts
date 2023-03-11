import { action, makeAutoObservable, observable } from "mobx";
import { useNavigate } from "react-router-dom";
import { MAuth } from "../Model/MAuth";
import { AuthRepo } from "../Repository/AuthRepo";
const TOKEN_KEY = "token";

export class AuthStore {
  @observable user: MAuth | null = null;
  @observable isLoading: boolean = false;
  @observable token: string | null = null;
  @observable isNewUser: boolean = false;

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
  SetIsNewUser = (v: boolean) => {
    this.isNewUser = v;
  };

  @action
  SetLoading = (v: boolean) => {
    this.isLoading = v;
  };

  @action
  SetToken = (token: string | null,r:string|null,p:string|null) => {
    let validToken: string | null = null;
    if (!token) validToken = null;
    else if (token !== "") validToken = token;
    if (validToken) {
      window.localStorage.setItem(TOKEN_KEY, validToken);
     
    } else {
      window.localStorage.removeItem(TOKEN_KEY);
      window.location.href = "/"
    }
    this.token = validToken;
    //routing accordingly 
    if(r && p){
      //if expected route have query parameters
      // window.location.href = `${r}?${p}`
      window.location.replace(`${r}?${p}`)
    }
    else if(r){
      //if expected route have no query parameters
      // window.location.href = `/${r}`;
      window.location.replace(`${r}`)
      // window.location.search = ""
    }else{
      //no expected route the original functionality
        if (this.isNewUser) {
          window.location.pathname = "/profile";
        } else {
          window.location.pathname = "/feed";
        }
    }
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
  LoginUser = async (mail_id: string, password: string, r:string|null,p:string|null) => {
    this.SetLoading(true);
    try {
      const { user_data, token } = await this.authRepo.login(mail_id, password);
      this.SetUser(user_data);
      this.SetToken(token,r,p);
    } catch (err) {
      throw err;
    } finally {
      this.SetLoading(false);
    }
  };

  @action
  OAuthLoginUser = async (id_token: string, r:string|null,p:string|null) => {
    this.SetLoading(true);
    try {
      const { user_data, token, is_exists } = await this.authRepo.oauthLogin(
        id_token
      );
      if (!is_exists) {
        this.SetIsNewUser(true);
      }
      this.SetUser(user_data);
      this.SetToken(token,r,p);
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
      this.SetToken(null,null,null);
    } catch (err) {
      throw err;
    } finally {
      this.SetLoading(false);
    }
  };

  @action
  SignUpUser = async (mail_id: string, password: string, otp: string,r:string|null,p:string|null) => {
    this.SetLoading(true);
    try {
      const { user_data, token } = await this.authRepo.signUp(
        mail_id,
        password,
        otp
      );
      this.SetIsNewUser(true);
      this.SetUser(user_data);
      this.SetToken(token,r,p);
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
      this.SetToken(token,null,null);
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
