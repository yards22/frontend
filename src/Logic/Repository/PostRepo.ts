import { Request } from "../Utils/Fetch";
import { CheckResponse, ThrowFor } from "../Utils/ResponseHandler";
import { AuthHeaders } from "../../Atoms/Util";
import MPost from "../Model/MPost";

export class PostRepo {
  baseUrlForProfilePic: string;
  baseUrl: string;
  rq: Request;
  constructor(baseUrl: string, baseUrlForProfilePic: string, rq: Request) {
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

      const res = await fetch(`${this.baseUrl}`, {
        method: "POST",
        body: data,
        headers: { ...AuthHeaders(props.token) },
      });

      const { body } = await CheckResponse(res, 201);
      if (body.data) {
        const images: string[] = [];
        (JSON.parse(body.data.media) as string[]).forEach((item) => {
          images.push(this.baseUrlForProfilePic + "/" + item);
        });
        body.data.media = images;
      }
      return body.data;
    } catch (err: any) {
      throw ThrowFor(err, {});
    }
  }

  async getFeedPost(
    token: string,
    limit: number,
    offset: number
  ): Promise<MPost[]> {
    try {
      // first part
      let res = await this.rq.Get(
        `${this.baseUrl}?limit=${limit}&offset=${offset}`,
        AuthHeaders(token)
      );
      let { body } = await CheckResponse(res, 200);

      const firstPart = body.data as any[];

      const postMap = new Map();
      const post_ids = firstPart.map((item) => {
        item.media = (item.media as any[]).map((m) => {
          return this.baseUrlForProfilePic + m;
        });
        postMap.set(Number(item.post_id), item);
        return Number(item.post_id);
      });

      // second part
      res = await this.rq.Post(
        `${this.baseUrl}/postMeta`,
        {
          post_ids,
        },
        AuthHeaders(token)
      );
      body = (await CheckResponse(res, 200)).body;
      const secondPart = body.data as {
        isLiked: any[];
        isFavourite: any[];
        likedUsers: any[];
      };

      // now combine both first and second part
      secondPart.isLiked.forEach((item) => {
        const postFromMap = postMap.get(item.postId);
        postFromMap.is_liked = item.likeStatus;
        postMap.set(item.postId, postFromMap);
      });
      secondPart.isFavourite.forEach((item) => {
        const postFromMap = postMap.get(item.postId);
        postFromMap.is_favorite = item.favouriteStatus;
        postMap.set(item.postId, postFromMap);
      });
      secondPart.likedUsers.forEach((item) => {
        const postFromMap = postMap.get(item.postId);
        postFromMap.liked_by = item.username;
        postMap.set(item.postId, postFromMap);
      });

      const finalPosts: MPost[] = [];
      postMap.forEach((v) => {
        finalPosts.push({
          ...v,
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
}
