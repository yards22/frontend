import {
  CheckResponse,
  ThrowFor,
} from "../Utils/ResponseHandler";
import { Request } from "../Utils/Fetch";
import { AuthHeaders } from "../../Atoms/Util";
import { MNotification } from "../Model/MNotification";

export class NotificationRepo {
  baseUrl: string;
  rq: Request;
  constructor(baseUrl: string, rq: Request) {
    this.rq = rq;
    this.baseUrl = baseUrl;
  }

  async getNotifications(token: string) {
    try {
      const res = await this.rq.Get(
        this.baseUrl,
        AuthHeaders(token),
      );
      const { body } = await CheckResponse(res, 200);
      const temp: MNotification[] = (
        body.data as any[]
      ).map((v) => {
        return { ...v, created_at: new Date(v.created_at) };
      });
      return temp;
    } catch (err: any) {
      ThrowFor(err, {});
    }
  }

  async getUsernames(token: string, user_ids: number[]) {
    try {
      const res = await this.rq.Post(
        this.baseUrl + "/username",
        {
          user_ids,
        },
        AuthHeaders(token),
      );
      const { body } = await CheckResponse(res, 200);
      return body.data;
    } catch (err: any) {
      ThrowFor(err, {});
    }
  }

  async updateNotification() {}
}
