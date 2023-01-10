import { AuthHeaders } from "../../Atoms/Util";
import { MConnection } from "../Model/MConnection";
import { Request } from "../Utils/Fetch";
import { CheckResponse } from "../Utils/ResponseHandler";
export class NetworkRepo {
  baseUrlForProfilePic: string;
  baseUrl: string;
  rq: Request;
  constructor(baseUrl: string, baseUrlForProfilePic: string, rq: Request) {
    this.rq = rq;
    this.baseUrl = baseUrl;
    this.baseUrlForProfilePic = baseUrlForProfilePic;
  }

  async follow(token: string, user_id: number) {
    try {
      const res = await this.rq.Post(
        `${this.baseUrl}/network`,
        {
          following_id: user_id,
        },
        AuthHeaders(token)
      );
      await CheckResponse(res, 201);
    } catch (err: any) {
      throw err;
    }
  }

  async removeFollow(token: string, user_id: number) {
    try {
      const res = await this.rq.Delete(
        `${this.baseUrl}/network`,
        {
          following_id: user_id,
        },
        AuthHeaders(token)
      );
      await CheckResponse(res, 200);
    } catch (err: any) {
      throw err;
    }
  }

  async getFollowing(token: string): Promise<MConnection[]> {
    try {
      const res = await this.rq.Get(
        `${this.baseUrl}/network/whoAmIFollowing`,
        AuthHeaders(token)
      );
      const { body } = await CheckResponse(res, 200);
      return (body.data as MConnection[]).map((item) => {
        return {
          ...item,
          profile_pic_uri: this.baseUrlForProfilePic + item.profile_pic_uri,
        };
      });
    } catch (err: any) {
      throw err;
    }
  }

  async getFollowers(token: string): Promise<MConnection[]> {
    try {
      const res = await this.rq.Get(
        `${this.baseUrl}/network/myfollowers`,
        AuthHeaders(token)
      );
      const { body } = await CheckResponse(res, 200);

      return (body.data as MConnection[]).map((item) => {
        return {
          ...item,
          profile_pic_uri: this.baseUrlForProfilePic + item.profile_pic_uri,
        };
      });
    } catch (err: any) {
      throw err;
    }
  }
}
