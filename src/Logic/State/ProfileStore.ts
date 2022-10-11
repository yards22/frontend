import { action, makeAutoObservable, observable } from "mobx";
import { MProfile } from "../Model/MProfile";
import { ProfileRepo } from "../Repository/ProfileRepo";
const TOKEN_KEY = "token";

export class ProfileStore {
  @observable profile: MProfile | null = null;
  @observable isLoading: boolean = false;
  @observable token: string | null = null;
  profileRepo: ProfileRepo;

  constructor(profileRepo: ProfileRepo) {
    makeAutoObservable(this);
    this.profileRepo = profileRepo;
    this.token = window.localStorage.getItem(TOKEN_KEY);
  }

  @action
  SetProfile = (profile: MProfile | null) => {
    this.profile = profile;
  };

  @action
  SetLoading = (v: boolean) => {
    this.isLoading = v;
  };

  @action
  GetProfile = async (token: any) => {
    this.SetLoading(true);
    try {
      const profile = await this.profileRepo.getProfile(token || "");
      this.SetProfile(profile);
    } catch (err) {
      throw err;
    } finally {
      this.SetLoading(false);
    }
  };

  @action
  UpdateProfile = async (props: any) => {
    this.SetLoading(true);
    try {
      console.log("props", ...props.formData);
      const profile = await this.profileRepo.updateUserDetails(props);
      this.SetProfile(profile);
    } catch (err) {
      throw err;
    } finally {
      this.SetLoading(false);
    }
  };

  @action
  CheckUserNameAvailability = async (props : {username : string,token : string})=>{
    this.SetLoading(true)
    try{
      const res = await this.profileRepo.checkUserName(props);
      return res.message
    }catch (err){
      throw err
    }finally{
      this.SetLoading(false)
    }
  } 
}
