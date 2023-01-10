import { brotliCompressSync } from "zlib";
import { MAuth } from "../Model/MAuth";
import { Request } from "../Utils/Fetch";
import { CheckResponse, ThrowFor } from "../Utils/ResponseHandler";
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
    } catch (err: any) {
      throw ThrowFor(err, {
        405: "The account is associated with Login With Google.",
        404: "No such user account exists.",
        401: "Email/Password combination mismatch.",
        400: "Email/Password missing.",
      });
    }
  }

  async oauthLogin(id_token: string) {
    try {
      const res = await this.rq.Post(`${this.baseUrl}/oauth`, {
        id_token,
      });
      const { body } = await CheckResponse(res, 200);
      return {
        user_data: body.data.user_data as MAuth,
        token: body.data.token as string,
        is_exists: body.data.is_exists as boolean,
      };
    } catch (err: any) {
      err.message = "Email/Password combination mismatch.";
      throw err;
    }
  }

  async verifySignUpOTP(mail_id: string, otp: string) {
    try {
      const res = await this.rq.Post(`${this.baseUrl}/verifyOTP`, {
        mail_id,
        OTP: otp,
      });
      await CheckResponse(res, 200);
    } catch (err) {
      throw ThrowFor(err, { 401: "OTP expired or invalid OTP entered." });
    }
  }
  async sendSignUpOTP(mail_id: string) {
    try {
      const res = await this.rq.Post(`${this.baseUrl}/sendOTP`, {
        mail_id,
      });
      await CheckResponse(res, 200);
    } catch (err) {
      throw ThrowFor(err, {
        403: "Email already used for another account.",
      });
    }
  }

  async verifyForgotPasswordOTP(mail_id: string, otp: string) {
    try {
      const res = await this.rq.Post(`${this.baseUrl}/verifyOTPforgot`, {
        mail_id,
        OTP: otp,
      });
      await CheckResponse(res, 200);
    } catch (err) {
      throw ThrowFor(err, { 401: "OTP expired or invalid OTP entered." });
    }
  }

  async sendForgotPasswordOTP(mail_id: string) {
    try {
      const res = await this.rq.Post(`${this.baseUrl}/sendOTPforgot`, {
        mail_id,
      });
      await CheckResponse(res, 200);
    } catch (err) {
      throw ThrowFor(err, {
        403: "No account found for the following email.",
      });
    }
  }

  async signUp(mail_id: string, password: string, otp: string) {
    try {
      const res = await this.rq.Post(`${this.baseUrl}/signup`, {
        mail_id,
        password,
        OTP: otp,
      });
      const { body } = await CheckResponse(res, 201);
      return {
        user_data: body.data.user_data as MAuth,
        token: body.data.token as string,
      };
    } catch (err) {
      throw err;
    }
  }

  async updatePassword(mail_id: string, password: string, otp: string) {
    try {
      const res = await this.rq.Put(`${this.baseUrl}/updPassword`, {
        mail_id,
        password,
        OTP: otp,
      });
      const { body } = await CheckResponse(res, 200);
      return {
        user_data: body.data.user_data as MAuth,
        token: body.data.token as string,
      };
    } catch (err) {
      throw ThrowFor(err, {});
    }
  }

  async logout(token: string) {
    try {
      const res = await this.rq.Delete(
        `${this.baseUrl}/logout`,
        {},
        { Authorization: `Bearer ${token}` }
      );
      await CheckResponse(res, 200);
      return;
    } catch (err) {
      throw err;
    }
  }
}
