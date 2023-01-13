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
  GetPosts = async (
    type: "feed" | "mine" | "trending" | "fav",
    userId?: Number,
    sort: "asc" | "desc" = "desc"
  ) => {
    this.viewPosts = null;
    try {
      const posts = await this.postRepo.getFeedPost(
        this.token || "",
        type,
        10,
        0,
        userId
      );

      //sorting post
      posts.sort((a, b) => {
        if (sort === "desc")
          return b.created_at.getTime() - a.created_at.getTime();
        return 1;
      });

      this.viewPosts = posts;
    } catch (err) {
      throw err;
    }
  };

  @action
  ToggleLike = async (post_id: bigint, username: string) => {
    try {
      if (!this.viewPosts) return;
      const posts = this.viewPosts.map((v) => v);
      let liked = false;
      let index = -1;

      // get the index and like status of the post
      for (let i = 0; i < posts.length; i++) {
        if (posts[i].post_id === post_id) {
          liked = posts[i].is_liked;
          index = i;
          break;
        }
      }

      // send with toggled like
      await this.postRepo.likePost(this.token || "", post_id, !liked);

      // now update in local store
      posts[index].is_liked = !liked;
      if (liked) {
        // remove from list of usernames
        posts[index].liked_by = posts[index].liked_by.filter(
          (v) => v !== username
        );
      } else {
        // add to list of usernames who liked post
        posts[index].liked_by.push(username);
      }

      this.viewPosts = posts;
    } catch (err) {
      throw err;
    }
  };

  @action
  ToggleFav = async (post_id: bigint) => {
    try {
      if (!this.viewPosts) return;
      const posts = this.viewPosts.map((v) => v);
      let is_fav = false;
      let index = -1;

      // get the index and is_fav status of the post
      for (let i = 0; i < posts.length; i++) {
        if (posts[i].post_id === post_id) {
          is_fav = posts[i].is_favorite;
          index = i;
          break;
        }
      }

      // send with toggled is_fav
      await this.postRepo.favPost(this.token || "", post_id, !is_fav);

      // now update in local store
      posts[index].is_favorite = !is_fav;

      this.viewPosts = posts;
    } catch (err) {
      throw err;
    }
  };
}
