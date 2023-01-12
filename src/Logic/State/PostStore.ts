import { action, makeAutoObservable, observable } from "mobx";
import MPost from "../Model/MPost";
import { PostRepo } from "../Repository/PostRepo";

export class PostStore {
  @observable viewPosts: MPost[] | null = [];
  @observable isLoading: boolean = false;
  @observable token: string | null = null;
  postRepo: PostRepo;

  constructor(postRepo: PostRepo) {
    makeAutoObservable(this);
    this.postRepo = postRepo;
    this.token = window.localStorage.getItem("token");
  }

  @action
  SetLoading = (v: boolean) => {
    this.isLoading = v;
  };

  @action
  CreatePost = async (props: any) => {
    this.SetLoading(true);
    try {
      await this.postRepo.createPost({
        data: props,
        token: this.token,
      });
    } catch (err) {
      throw err;
    } finally {
      this.SetLoading(false);
    }
  };

  @action
  GetPosts = async (type: "feed" | "mine" | "trending" | "fav") => {
    this.viewPosts = null;
    try {
      this.viewPosts = await this.postRepo.getFeedPost(
        this.token || "",
        type,
        10,
        0
      );
    } catch (err) {
      throw err;
    }
  };
}
