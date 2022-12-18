import { action, makeAutoObservable, observable } from "mobx";
import { MProfile } from "../Model/MProfile";
import { ProfileRepo } from "../Repository/ProfileRepo";

export class ProfileStore {
  @observable profile: MProfile | null = null;
  @observable viewProfile: MProfile | null = null;
  @observable isLoading: boolean = false;
  @observable token: string | null = null;
  profileRepo: ProfileRepo;

  constructor(profileRepo: ProfileRepo) {
    makeAutoObservable(this);
    this.profileRepo = profileRepo;
    console.log(window.localStorage.getItem("token"))
    this.token = window.localStorage.getItem("token");
  }

  @action
  SetProfile = (profile: MProfile | null) => {
    this.profile = profile;
  };

  @action
  SetViewProfile = (profile: MProfile | null) => {
    this.viewProfile = profile;
  };

  @action
  SetLoading = (v: boolean) => {
    this.isLoading = v;
  };

  @action
  GetProfile = async (user_id: number | null, username: string | null) => {
    this.SetLoading(true);
    try {
      this.token = window.localStorage.getItem("token");
      const profile = await this.profileRepo.getProfile(this.token || "");
      return profile;
    } catch (err) {
      throw err;
    } finally {
      this.SetLoading(false);
    }
  };

  @action
  UpdateProfile = async (props: any) => {
    // console.log(props);
    this.SetLoading(true);
    try {
      // console.log("props", ...props.formData);
      const profile = await this.profileRepo.updateUserDetails(props);
      this.SetProfile(profile);
    } catch (err) {
      throw err;
    } finally {
      this.SetLoading(false);
    }
  };

  @action
  CheckUserNameAvailability = async (username: string) => {
    this.SetLoading(true);
    try {
      const res = await this.profileRepo.checkUserName(
        username,
        this.token || ""
      );
      return res;
    } catch (err) {
      throw err;
    } finally {
      this.SetLoading(false);
    }
  };
}
