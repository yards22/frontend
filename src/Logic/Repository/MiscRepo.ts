import { AuthHeaders } from "../../Atoms/Util";
import { Request } from "../Utils/Fetch";
import { CheckResponse } from "../Utils/ResponseHandler";
export class MiscRepo {
  baseUrl: string;
  rq: Request;
  constructor(baseUrl: string, rq: Request) {
    this.rq = rq;
    this.baseUrl = baseUrl;
  }
  async putFeedback(token: string, content: string, image?: File) {
    try {
      const data = new FormData();

      // append content to form data
      data.append("content", content);

      // append images to form data
      if (image) {
        console.log("image is there");

        data.append("image", image);
      }

      const res = await fetch(`${this.baseUrl}/feedback`, {
        method: "POST",
        body: data,
        headers: { ...AuthHeaders(token) },
      });

      await CheckResponse(res, 201);
      return;
    } catch (err) {
      throw err;
    }
  }
}
