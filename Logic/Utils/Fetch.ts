export class Request {
  commonHeaders: { [key: string]: string };

  constructor(commonHeaders: { [key: string]: string }) {
    this.commonHeaders = commonHeaders;
  }

  async Raw(
    url: string,
    method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE",
    data?: any
  ) {
    const response = await fetch(url, {
      method: method,
      headers: this.commonHeaders,
      body: data ? JSON.stringify(data) : null,
    });
    return response;
  }

  async Get(url: string) {
    return this.Raw(url, "GET", null);
  }
  async Post(url: string, data = {}) {
    return this.Raw(url, "POST", data);
  }
  async Delete(url: string, data = {}) {
    return this.Raw(url, "DELETE", data);
  }
  async Patch(url: string, data = {}) {
    return this.Raw(url, "PATCH", data);
  }
  async Put(url: string, data = {}) {
    return this.Raw(url, "PUT", data);
  }
}
