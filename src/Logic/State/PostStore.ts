import { action, makeAutoObservable, observable } from "mobx";
import MPost from "../Model/MPost";
import { PostRepo } from "../Repository/PostRepo";

export class PostStore {
  @observable myPosts: MPost[] = [];
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
      const post = await this.postRepo.createPost({
        data: props,
        token: this.token,
      });
      this.myPosts.push(post);
    } catch (err) {
      throw err;
    } finally {
      this.SetLoading(false);
    }
  };
}
