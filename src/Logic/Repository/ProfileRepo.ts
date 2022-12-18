import { MProfile } from "../Model/MProfile";
import { Request } from "../Utils/Fetch";
import { CheckResponse, ThrowFor } from "../Utils/ResponseHandler";
import { AuthHeaders } from "../../Atoms/Util";

export class ProfileRepo {
  baseUrl: string;
  rq: Request;
  constructor(baseUrl: string, rq: Request) {
    this.rq = rq;
    this.baseUrl = baseUrl;
  }

  async  getProfile(token: string): Promise<MProfile> {
    try {
      // console.log("in Get profile fetch");
      const res = await this.rq.Get(`${this.baseUrl}/`, AuthHeaders(token));
      const { body } = await CheckResponse(res, 200);
      // console.log(body);
      return {
        bio: body.data.bio,
        cric_index: body.data.cric_index,
        email_id: body.data.email_id,
        interests: body.data.interests,
        profile_image_uri: body.data.profile_image_uri,
        user_id: body.data.user_id,
        username: body.data.username,
        updated_at: body.data.updated_at,
      };
    } catch (err: any) {
      throw ThrowFor(err, {});
    }
  }

  async checkUserName(props : {username : string,token : string}): Promise<number> {
    try {
      const data = {username : props.username}
      const res = await this.rq.Post(`${this.baseUrl}/checkUsername`, data, { "Content-Type":"application/json", "Authorization":`Bearer ${props.token}`});
      const response = await CheckResponse(res, 200);
      return response.status
    } catch (err: any) {
      throw ThrowFor(err, {});
    }
  }

  async updateUserDetails(props: any): Promise<MProfile> {
    try {
      const data = props.formData;
      const res = await this.rq.Put(
        `${this.baseUrl}/`,
        data,
        AuthHeaders(props.token)
      );
      const { body } = await CheckResponse(res, 200);
      return {
        bio: body.data.bio,
        cric_index: body.data.cric_index,
        email_id: body.data.email_id,
        interests: body.data.interests,
        profile_image_uri: body.data.profile_image_uri,
        user_id: body.data.user_id,
        username: body.data.username,
        updated_at: body.data.updated_at,
      };
    } catch (err: any) {
      throw ThrowFor(err, {});
    }
  }
}
