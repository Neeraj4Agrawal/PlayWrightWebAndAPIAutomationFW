import { APIRequestContext } from "@playwright/test";

export class ApiHelper {
  private readonly request: APIRequestContext;
  private readonly baseURL: string;

  constructor(request: APIRequestContext, baseURL: string) {
    this.request = request;
    this.baseURL = baseURL;
  }

  //helper methods
  // GET CALL
  async get(endPoint: string, headers?: Record<string, string>) {
    let response = await this.request.get(`${this.baseURL}${endPoint}`, {
      headers: headers,
    });
    return {
      status: response.status(),
      body: await response.json(),
    };
  }

  // POST CALL
  async post(endPoint: string, data: object, headers?: Record<string, string>) {
    let response = await this.request.post(`${this.baseURL}${endPoint}`, {
      headers: headers,
      data: data,
    });
    return {
      status: response.status(),
      body: await response.json(),
    };
  }

  // PUT CALL
  async put(endPoint: string, data: object, header?: Record<string, string>) {
    let response = await this.request.put(`${this.baseURL}${endPoint}`, {
      headers: header,
      data: data,
    });
    return {
      status: response.status(),
      body: await response.json(),
    };
  }

  // DELETE CALL
  async delete(endPoint: string, headers?: Record<string, string>) {
    let response = await this.request.delete(`${this.baseURL}${endPoint}`, {
      headers: headers,
    });
    return {
      status: response.status(),
    };
  }
}
