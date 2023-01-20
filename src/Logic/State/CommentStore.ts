import { action, makeAutoObservable, observable } from "mobx";
import { MComment, MCommentReply } from "../Model/MComment";
import { MLeaderboard } from "../Model/MLeaderboard";
import { MPoll } from "../Model/MPoll";
import { CommentRepo } from "../Repository/CommentRepo";
import { ProfileStore } from "./ProfileStore";

export class CommentStore {
  @observable comments: Map<bigint, MComment[]>;
  @observable token: string | null;
  commentPostMap: Map<bigint, bigint> = new Map();
  @observable polls: MPoll[] | null = null;
  @observable leaderboard: MLeaderboard[] | null = null;
  profileStore: ProfileStore;
  commentRepo: CommentRepo;

  constructor(commentRepo: CommentRepo, profileStore: ProfileStore) {
    makeAutoObservable(this);
    this.commentRepo = commentRepo;
    this.comments = new Map();
    this.profileStore = profileStore;
    this.token = window.localStorage.getItem("token");
  }

  @action
  GetComment = async (post_id: bigint) => {
    try {
      const c = await this.commentRepo.getComments(this.token || "", post_id);
      this.comments.set(post_id, c);
      c.forEach((v) => {
        this.commentPostMap.set(v.comment_id, post_id);
      });
    } catch (err) {
      throw err;
    }
  };

  @action
  Comment = async (parent_id: bigint, content: string, isReply: boolean) => {
    if (!this.profileStore.profile) {
      throw new Error("Cannot perform at the moment.");
    }
    try {
      if (isReply) {
        await this.commentRepo.reply(this.token || "", parent_id, content);

        // forming reply object
        const reply: MCommentReply = {
          content,
          user_id: this.profileStore.profile.user_id,
          username: this.profileStore.profile.username,
          profile_image_uri: this.profileStore.profile.profile_image_uri,
          created_at: new Date()
        };

        // finding post_id for which the comment belongs
        const post_id = this.commentPostMap.get(parent_id);
        if (post_id) {
          let comment = this.comments.get(post_id) || [];
          comment = comment.map((v) => {
            if (v.comment_id === parent_id) {
              const replies = v.replies;
              replies.push(reply);
              return { ...v, replies };
            }
            return v;
          });
          this.comments.set(post_id, comment);
        }
      } else {
        const d = await this.commentRepo.comment(
          this.token || "",
          parent_id,
          content
        );

        // forming comment object
        const comment: MComment = {
          comment_id: d.comment_id,
          content,
          user_id: this.profileStore.profile.user_id,
          username: this.profileStore.profile.username,
          profile_image_uri: this.profileStore.profile.profile_image_uri,
          created_at: new Date(),
          replies: []
        };

        const cs = this.comments.get(parent_id) || [];
        cs.push(comment);
        this.comments.set(parent_id, cs);
      }
    } catch (err) {
      throw err;
    }
  };
}
