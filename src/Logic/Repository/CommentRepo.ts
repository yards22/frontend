import { AuthHeaders } from "../../Atoms/Util";
import { MComment } from "../Model/MComment";
import { Request } from "../Utils/Fetch";
import { CheckResponse, ThrowFor } from "../Utils/ResponseHandler";

export class CommentRepo {
  baseUrl: string;
  rq: Request;
  baseUrlForProfilePic: string;
  constructor(baseUrl: string, baseUrlForProfilePic: string, rq: Request) {
    this.baseUrl = baseUrl;
    this.baseUrlForProfilePic = baseUrlForProfilePic;
    this.rq = rq;
  }

  async getComments(token: string, post_id: bigint): Promise<MComment[]> {
    try {
      const res = await this.rq.Get(
        `${this.baseUrl}?post_id=${post_id}`,
        AuthHeaders(token)
      );
      const { body } = await CheckResponse(res, 200);
      let temp = body.data as MComment[];
      temp = temp.map((v) => {
        return {
          ...v,
          created_at: new Date(v.created_at),
          profile_image_uri: v.profile_image_uri
            ? this.baseUrlForProfilePic + v.profile_image_uri
            : null,
          replies: v.replies.map((r) => {
            return {
              ...r,
              created_at: new Date(r.created_at),
              profile_image_uri: r.profile_image_uri
                ? this.baseUrlForProfilePic + r.profile_image_uri
                : null
            };
          })
        };
      });
      return temp;
    } catch (err: any) {
      throw ThrowFor(err, {});
    }
  }

  async comment(token: string, post_id: bigint, content: string) {
    try {
      const res = await this.rq.Post(
        `${this.baseUrl}`,
        {
          post_id,
          content
        },
        AuthHeaders(token)
      );
      const { body } = await CheckResponse(res, 200);
      return body.data as MComment;
    } catch (err: any) {
      throw ThrowFor(err, {});
    }
  }

  async reply(token: string, comment_id: bigint, content: string) {
    try {
      const res = await this.rq.Post(
        `${this.baseUrl}/reply`,
        {
          comment_id,
          content
        },
        AuthHeaders(token)
      );
      const { body } = await CheckResponse(res, 200);
      return body.data as MComment;
    } catch (err: any) {
      throw ThrowFor(err, {});
    }
  }
}
