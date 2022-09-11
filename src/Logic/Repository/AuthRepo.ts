import { MAuth } from "../Model/MAuth";
import { Request } from "../Utils/Fetch";
import { CheckResponse } from "../Utils/ResponseHandler";
export class AuthRepo {
  baseUrl: string;
  rq: Request;
  constructor(baseUrl: string, rq: Request) {
    this.rq = rq;
    this.baseUrl = baseUrl;
  }
  async me(token: string) {
    try {
      const res = await this.rq.Get(`${this.baseUrl}/`, {
        Authorization: `Bearer ${token}`,
      });
      const { body } = await CheckResponse(res, 200);
      return {
        user_data: body.data as MAuth,
      };
    } catch (err) {
      throw err;
    }
  }

  async login(mail_id: string, password: string) {
    try {
      const res = await this.rq.Post(`${this.baseUrl}/login`, {
        mail_id,
        password,
      });
      const { body } = await CheckResponse(res, 200);
      return {
        user_data: body.data.user_data as MAuth,
        token: body.data.token as string,
      };
    } catch (err) {
      throw err;
    }
  }

  async logout(token: string) {
    try {
      const res = await this.rq.Delete(
        `${this.baseUrl}/logout`,
        {},
        { Authorization: `Bearer ${token}` }
      );
      const {} = await CheckResponse(res, 200);
      return;
    } catch (err) {
      throw err;
    }
  }
}
