import { MProfile } from "../Model/MProfile";
import { Request } from "../Utils/Fetch";
import { CheckResponse, ThrowFor } from "../Utils/ResponseHandler";
import {AuthHeaders} from "../../Atoms/Util"

export class ProfileRepo {
  baseUrl: string;
  rq: Request;
  constructor(baseUrl: string, rq: Request) {
    this.rq = rq;
    this.baseUrl = baseUrl;
  }

  async getProfile(token: string): Promise<MProfile> {
    try {
      const res = await this.rq.Get(`${this.baseUrl}/`, AuthHeaders(token));
      const { body } = await CheckResponse(res, 200);
      return {
        bio: body.data.bio,
        cric_index: body.data.cric_index,
        email_id: body.data.email_id,
        interests: body.data.user.Interests,
        profile_image_uri: body.data.profile_image_uri,
        user_id: body.data.user_id,
        username: body.data.username,
        updated_at: body.data.updated_at,
      };
    } catch (err: any) {
      throw ThrowFor(err, {});
    }
  }

  async checkUserName(username: string): Promise<any> {
    try {
      const res = await this.rq.Post(`${this.baseUrl}/checkUsername`,{username});
      const { body } = await CheckResponse(res, 200);
      console.log(body)
    } catch (err: any) {
      throw ThrowFor(err, {});
    }
  }

  async updateUserDetails(props:any): Promise<MProfile> {
    try {
      const data = props.formData
      const res = await this.rq.Put(`${this.baseUrl}/editProfile`,data,AuthHeaders(props.token));
      const { body } = await CheckResponse(res, 200);
      return {
        bio: body.data.bio,
        cric_index: body.data.cric_index,
        email_id: body.data.email_id,
        interests: [],
        profile_image_uri: body.data.profile_image_uri,
        user_id: body.data.user_id,
        username: body.data.username,
        updated_at: body.data.updated_at,
      }
    } catch (err: any) {
      throw ThrowFor(err, {});
    }
  }
}
