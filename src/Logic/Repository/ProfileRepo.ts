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

  async updateUserDetails(
    token: string,
    username?: string,
    bio?: string,
    intr?: string[],
    image?: File
  ): Promise<MProfile> {
    try {
      const data = new FormData();
      if (username) data.append("username", username);
      if (bio) data.append("bio", bio);
      if (intr) data.append("interests", intr.toString());
      if (image) data.append("image", image);

      const res = await fetch(`${this.baseUrl}/`, {
        method: "PUT",
        body: data,
        headers: { ...AuthHeaders(token) },
      });
      const { body } = await CheckResponse(res, 200);
      let interests = [];
      if (body.data.interests) {
        interests = body.data.interests.split(",");
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
