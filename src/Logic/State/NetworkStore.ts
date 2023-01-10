import { action, makeAutoObservable, observable } from "mobx";
import { MConnection } from "../Model/MConnection";
import { NetworkRepo } from "../Repository/NetworkRepo";

export class NetworkStore {
  @observable followers: MConnection[] | null = null;
  @observable following: MConnection[] | null = null;
  networkRepo: NetworkRepo;
  token: string | null;

  constructor(networkRepo: NetworkRepo) {
    makeAutoObservable(this);
    this.networkRepo = networkRepo;
    this.token = window.localStorage.getItem("token");
  }

  @action
  Follow = async (
    user_id: number,
    username: string,
    profile_pic_uri: string | null
  ) => {
    try {
      await this.networkRepo.follow(this.token || "", user_id);
      this.following?.push({ user_id, username, profile_pic_uri });
    } catch (err) {
      throw err;
    }
  };

  @action
  UnFollow = async (user_id: number) => {
    try {
      await this.networkRepo.removeFollow(this.token || "", user_id);
      this.following =
        this.following?.filter((v) => user_id !== v.user_id) || [];
    } catch (err) {
      throw err;
    }
  };

  @action
  GetFollowersAndFollowing = async () => {
    try {
      this.following = await this.networkRepo.getFollowing(this.token || "");
      this.followers = await this.networkRepo.getFollowers(this.token || "");
    } catch (err) {
      throw err;
    }
  };

  IfFollows(user_id: number) {
    let found = false;
    this.following?.forEach((item) => {
      if (item.user_id === user_id) {
        found = true;
      }
    });
    return found;
  }
}
