import { action, makeAutoObservable, observable } from "mobx";
import { MConnection } from "../Model/MConnection";
import { NetworkRepo } from "../Repository/NetworkRepo";

export class NetworkStore {
  @observable followers: MConnection[] | null = null;
  @observable following: MConnection[] | null = null;
  @observable searches: MConnection[] | null | undefined = undefined;
  @observable recommendation: MConnection[] | null = null;
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
    cric_index: number,
    profile_image_uri: string | null
  ) => {
    try {
      await this.networkRepo.follow(this.token || "", user_id);
      this.following?.push({
        user_id,
        username,
        cric_index,
        profile_image_uri
      });
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
  GetRecommendation = async () => {
    try {
      this.recommendation = await this.networkRepo.getRecommendation(
        this.token || ""
      );
    } catch (err) {
      throw err;
    }
  };

  @action
  GetSearches = async (search: string) => {
    this.searches = null;
    try {
      this.searches = await this.networkRepo.getSearch(
        this.token || "",
        search
      );
    } catch (err) {
      throw err;
    }
  };

  @action
  GetFollowersAndFollowing = async (username?: string) => {
    this.followers = null;
    this.following = null;
    try {
      this.following = await this.networkRepo.getFollowing(
        this.token || "",
        username
      );
      this.followers = await this.networkRepo.getFollowers(
        this.token || "",
        username
      );
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
