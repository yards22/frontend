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
      const rawComments = await this.commentRepo.getComments(
        this.token || "",
        post_id
      );
      const finalComments = rawComments.map((comment) => {
        // updating if the comment are of the current logged in user itself
        comment.is_own_comment =
          comment.user_id === this.profileStore.profile?.user_id;

        // updating if the replies are of the current logged in user itself
        comment.replies = comment.replies.map((reply) => {
          return {
            ...reply,
            is_own_reply: reply.username === this.profileStore.profile?.username
          };
        });

        // sorting reply in desc order
        comment.replies.sort((a, b) => {
          return b.created_at.getTime() - a.created_at.getTime();
        });

        this.commentPostMap.set(comment.comment_id, post_id);

        // returning updated comment
        return comment;
      });

      // sorting comments in desc order
      finalComments.sort((a, b) => {
        return b.created_at.getTime() - a.created_at.getTime();
      });

      this.comments.set(post_id, finalComments);
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
        const d = await this.commentRepo.reply(
          this.token || "",
          parent_id,
          content
        );

        // forming reply object
        const reply: MCommentReply = {
          reply_id: d.reply_id,
          content,
          user_id: this.profileStore.profile.user_id,
          username: this.profileStore.profile.username,
          profile_image_uri: this.profileStore.profile.profile_image_uri,
          is_own_reply: true,
          created_at: new Date()
        };

        // finding post_id for which the comment belongs
        const post_id = this.commentPostMap.get(parent_id);
        if (post_id) {
          let comment = this.comments.get(post_id) || [];
          comment = comment.map((v) => {
            if (v.comment_id === parent_id) {
              let replies = v.replies;
              replies = [reply].concat(replies);
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
          is_own_comment: true,
          replies: []
        };

        const cs = [comment].concat(this.comments.get(parent_id) || []);
        this.comments.set(parent_id, cs);
      }
    } catch (err) {
      throw err;
    }
  };

  @action
  DeleteReply = async (reply_id: bigint, comment_id: bigint) => {
    if (!this.profileStore.profile) {
      throw new Error("Cannot perform at the moment.");
    }
    try {
      await this.commentRepo.deleteReply(
        this.token || "",
        comment_id,
        reply_id
      );

      // finding post_id for which the comment belongs
      const post_id = this.commentPostMap.get(comment_id);
      if (post_id) {
        let comment = this.comments.get(post_id) || [];
        comment = comment.map((v) => {
          if (v.comment_id === comment_id) {
            let replies = v.replies;
            replies = replies.filter((rep) => rep.reply_id !== reply_id);
            return { ...v, replies };
          }
          return v;
        });
        this.comments.set(post_id, comment);
      }
    } catch (err) {
      throw err;
    }
  };

  @action
  DeleteComment = async (post_id: bigint, comment_id: bigint) => {
    if (!this.profileStore.profile) {
      throw new Error("Cannot perform at the moment.");
    }
    try {
      await this.commentRepo.deleteComment(
        this.token || "",
        post_id,
        comment_id
      );

      const cs = (this.comments.get(post_id) || []).filter(
        (v) => v.comment_id !== comment_id
      );

      this.comments.set(post_id, cs);
    } catch (err) {
      throw err;
    }
  };
}
