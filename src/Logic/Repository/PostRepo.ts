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
}
