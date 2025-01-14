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
        name: body.data.name,
        cric_index: body.data.cric_index,
        email_id: body.data.email_id,
        interests: interests,
        profile_image_uri: body.data.profile_image_uri
          ? this.baseUrlForProfilePic + body.data.profile_image_uri
          : null,
        user_id: body.data.user_id,
        username: body.data.username,
        followers: body.data.followers,
        following: body.data.following,
        updated_at: body.data.updated_at
      };
    } catch (err: any) {
      throw ThrowFor(err, {});
    }
  }

  async checkUserName(username: string, token: string) {
    try {
      const res = await this.rq.Get(
        `${this.baseUrl}/username/check-availability?username=${username}`,
        {
          Authorization: `Bearer ${token}`
        }
      );
      await CheckResponse(res, 200);
    } catch (err: any) {
      throw ThrowFor(err, {});
    }
  }

  async updateUserDetails(
    token: string,
    username?: string,
    name?: string,
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
      data.append("name", name || "");

      const res = await fetch(`${this.baseUrl}/`, {
        method: "PUT",
        body: data,
        headers: { ...AuthHeaders(token) }
      });
      const { body } = await CheckResponse(res, 200);
      let interests = [];
      if (body.data.interests) {
        interests = body.data.interests.split(",");
      }

      return {
        bio: body.data.bio,
        name: body.data.name,
        cric_index: body.data.cric_index,
        email_id: body.data.email_id,
        interests: interests,
        followers: body.data.followers,
        profile_image_uri:
          this.baseUrlForProfilePic + body.data.profile_image_uri,
        following: body.data.following,
        user_id: body.data.user_id,
        username: body.data.username,
        updated_at: body.data.updated_at
      };
    } catch (err: any) {
      throw ThrowFor(err, {});
    }
  }
}
