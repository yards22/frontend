import { AuthHeaders } from "../../Atoms/Util";
import { MPoll } from "../Model/MPoll";
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

  async getPolls(token: string): Promise<MPoll[]> {
    try {
      const res = await this.rq.Get(`${this.baseUrl}/poll`, AuthHeaders(token));
      const { body } = await CheckResponse(res, 200);
      return body.data;
    } catch (err: any) {
      throw err;
    }
  }

  async postPollReaction(token: string, poll_id: number, type: number) {
    try {
      const res = await this.rq.Post(
        `${this.baseUrl}/poll`,
        {
          poll_id,
          type,
        },
        AuthHeaders(token)
      );
      await CheckResponse(res, 201);
      return;
    } catch (err: any) {
      throw err;
    }
  }

  async getLeaderBoard(token: string) {
    try {
      const res = await this.rq.Get(
        `${this.baseUrl}/leaderboard?limit=50`,
        AuthHeaders(token)
      );
      const { body } = await CheckResponse(res, 200);
      return body.data;
    } catch (err: any) {
      throw err;
    }
  }
}
