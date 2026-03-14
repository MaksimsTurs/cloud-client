import type { HTTPRequestOptions, HTTPRequestBody } from "../http.type";

import HTTPError from "../errors/HTTP-Error.error";

import formatBody from "./format-body.util";
import formatHeaders from "./format-headers.util";
import formatUrl from "./format-url.util";
import getResponseBodyData from "./get-response-body-data.util";

export default async function makeRequest<T>(method: string, path: string, options?: HTTPRequestOptions): Promise<T> {
  try {
    const headers: Headers = formatHeaders(options?.headers, options?.body);
    const url: string = formatUrl(path);
    const body: HTTPRequestBody = formatBody(options?.body);

    const response: Response = await fetch(url, { 
      method, 
      ...options,
      headers,
      body: method === "GET" ? undefined : body,
    });

    if(!response.ok) {
      throw new HTTPError(path, response, options);
    }
      
    return await getResponseBodyData<T>(response, options);
  } catch(error) {
    throw error;
  }
};
