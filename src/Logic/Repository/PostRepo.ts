import { Request } from "../Utils/Fetch";
import {
  CheckResponse,
  ThrowFor,
} from "../Utils/ResponseHandler";
import { AuthHeaders } from "../../Atoms/Util";
import MPost from "../Model/MPost";

export class PostRepo {
  baseUrlForProfilePic: string;
  baseUrl: string;
  rq: Request;
  constructor(
    baseUrl: string,
    baseUrlForProfilePic: string,
    rq: Request
  ) {
    this.rq = rq;
    this.baseUrl = baseUrl;
    this.baseUrlForProfilePic = baseUrlForProfilePic;
  }

  async createPost(props: any): Promise<MPost> {
    try {
      const data = new FormData();

      // append content to form data
      if (props.data.content) {
        data.append("content", props.data.content);
      }

      // append images to form data
      if (props.data.images) {
        (props.data.images as any[]).forEach((item) => {
          data.append("images", item);
        });
      }

      const res = await fetch(`${this.baseUrl}/post`, {
        method: "POST",
        body: data,
        headers: { ...AuthHeaders(props.token) },
      });

      const { body } = await CheckResponse(res, 201);
      if (body.data) {
        const images: string[] = [];
        (JSON.parse(body.data.media) as string[]).forEach(
          (item) => {
            images.push(
              this.baseUrlForProfilePic + "/" + item
            );
          }
        );
        body.data.media = images;
      }
      return body.data;
    } catch (err: any) {
      throw ThrowFor(err, {});
    }
  }

  async getFeedPost(
    token: string,
    type: string,
    limit: number,
    offset: number,
    user_id?: Number
  ): Promise<MPost[]> {
    try {
      let url = `${this.baseUrl}/post/${type}?limit=${limit}&offset=${offset}`;
      if (user_id) url += `&user_id=${user_id}`;

      let res = await this.rq.Get(url, AuthHeaders(token));
      let { body } = await CheckResponse(res, 200);

      const rawPosts = body.data as MPost[];
      const finalPosts: MPost[] = [];
      rawPosts.forEach((v) => {
        finalPosts.push({
          ...v,
          media: v.media
            ? v.media?.map(
                (item) => this.baseUrlForProfilePic + item
              )
            : null,
          created_at: new Date(v.created_at),
          updated_at: new Date(v.updated_at),
          profile_pic_ref: v.profile_pic_ref
            ? this.baseUrlForProfilePic + v.profile_pic_ref
            : null,
        });
      });
      return finalPosts;
    } catch (err: any) {
      throw err;
    }
  }

  async likePost(
    token: string,
    post_id: bigint,
    is_like: boolean
  ) {
    try {
      await this.rq.Put(
        `${this.baseUrl}/like`,
        { post_id, is_like },
        AuthHeaders(token)
      );
    } catch (err: any) {
      throw err;
    }
  }

  async favPost(
    token: string,
    post_id: bigint,
    is_fav: boolean
  ) {
    try {
      await this.rq.Put(
        `${this.baseUrl}/post/favourite`,
        { post_id, is_fav },
        AuthHeaders(token)
      );
    } catch (err: any) {
      throw err;
    }
  }

  async getPostById(
    token: string,
    post_id: bigint
  ): Promise<MPost | null> {
    try {
      const res = await this.rq.Get(
        `${this.baseUrl}/post/get-by-id?post_id=${post_id}`,
        AuthHeaders(token)
      );
      const { body } = await CheckResponse(res, 200);
      const post: MPost = body.data;
      post.created_at = new Date(post.created_at);

      if (post.media)
        post.media = post.media?.map(
          (v) => this.baseUrlForProfilePic + v
        );

      post.profile_pic_ref = post.profile_pic_ref
        ? this.baseUrlForProfilePic + post.profile_pic_ref
        : null;

      return post;
    } catch (err: any) {
      throw err;
    }
  }
}
