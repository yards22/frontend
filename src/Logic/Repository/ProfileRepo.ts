import { MProfile } from "../Model/MProfile";
import { Request } from "../Utils/Fetch";
import { CheckResponse, ThrowFor } from "../Utils/ResponseHandler";
import { AuthHeaders } from "../../Atoms/Util";

export class ProfileRepo {
  baseUrlForProfilePic: string;
  baseUrl: string;
  rq: Request;
  constructor(baseUrl: string, baseUrlForProfilePic: string, rq: Request) {
    this.rq = rq;
    this.baseUrl = baseUrl;
    this.baseUrlForProfilePic = baseUrlForProfilePic;
  }

  async getProfile(
    token: string,
    user_id?: Number | null,
    username?: string | null
  ): Promise<MProfile> {
    try {
      let url = `${this.baseUrl}`;
      if (user_id) url += `?user_id=${user_id}`;
      else if (username) url += `?username=${username}`;

      const res = await this.rq.Get(url, AuthHeaders(token));
      const { body } = await CheckResponse(res, 200);
      let interests = [];
      if (body.data.interests) {
        interests = body.data.interests.split(",");
        // interests = JSON.parse(body.data.interests) as string[];
      }

      return {
        bio: body.data.bio,
        cric_index: body.data.cric_index,
        email_id: body.data.email_id,
        interests: interests,
        profile_image_uri:
          this.baseUrlForProfilePic + body.data.profile_image_uri,
        user_id: body.data.user_id,
        username: body.data.username,
        followers: body.data.followers,
        following: body.data.following,
        updated_at: body.data.updated_at,
      };
    } catch (err: any) {
      throw ThrowFor(err, {});
    }
  }

  async checkUserName(username: string, token: string): Promise<number> {
    try {
      const data = { username: username };
      const res = await this.rq.Post(`${this.baseUrl}/checkUsername`, data, {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      });
      const response = await CheckResponse(res, 200);
      return response.status;
    } catch (err: any) {
      throw ThrowFor(err, {});
    }
  }

  async updateUserDetails(props: any): Promise<MProfile> {
    try {
      const data = new FormData();

      data.append("username", props.data.username);

      if (props.data.bio) {
        data.append("bio", props.data.bio);
      }
      if (props.data.interests) {
        data.append("interests", props.data.interests);
      }
      if (props.data.profile_image_uri) {
        data.append("image", props.data.image);
      }

      const res = await fetch(`${this.baseUrl}/`, {
        method: "PUT",
        body: data,
        headers: { ...AuthHeaders(props.token) },
      });
      const { body } = await CheckResponse(res, 200);
      let interests = [];
      if (body.data.interests) {
        interests = body.data.interests.split(",");
        // interests = JSON.parse(body.data.interests) as string[];
      }

      return {
        bio: body.data.bio,
        cric_index: body.data.cric_index,
        email_id: body.data.email_id,
        interests: interests,
        followers: body.data.followers,
        profile_image_uri:
          this.baseUrlForProfilePic + body.data.profile_image_uri,
        following: body.data.following,
        user_id: body.data.user_id,
        username: body.data.username,
        updated_at: body.data.updated_at,
      };
    } catch (err: any) {
      throw ThrowFor(err, {});
    }
  }
}
