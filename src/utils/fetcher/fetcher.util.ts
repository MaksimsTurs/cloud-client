import type { 
  Fethcer, 
  FormatedInit, 
  FetcherOptions, 
  FetcherResponse 
} from "./fetcher.type";

import formatUrl from "./utils/format-url.util";
import formatInit from "./utils/format-init.util";
import createFetcherResponse from "./utils/create-fetcher-response.util";

import { isInstanceOf } from "../is.util";

const fetcher: Fethcer = {
  base: undefined,
  get: async function<R = any, E = any>(url: string, options?: FetcherOptions): Promise<FetcherResponse<R, E>> {
    try {
      const initData: FormatedInit = formatInit(undefined, options?.headers);
      const response: Response = await fetch(formatUrl(this.base, url), {
        ...options,
        method: "GET",
        headers: initData.headers as HeadersInit
      });

      return await createFetcherResponse<R, E>(response, options);
    } catch(error) {
      if(isInstanceOf(error, Error)) {
        throw new Error((error as Error).message);
      } else {
        throw new Error("Unknown error occur while GET request!");
      }
    }
  },
  post: async function<R = any, E = any>(url: string, body?: any, options?: FetcherOptions): Promise<FetcherResponse<R, E>> {
    try {
      const initData: FormatedInit = formatInit(body, options?.headers);
      const response: Response = await fetch(formatUrl(this.base, url), {
        ...options,
        method: "POST",
        body: initData.body,
        headers: initData.headers as HeadersInit
      });

      return await createFetcherResponse<R, E>(response, options);
    } catch(error) {
       if(isInstanceOf(error, Error)) {
        throw new Error((error as Error).message);
      } else {
        throw new Error("Unknown error occur while GET request!");
      }     
    }
  }
};

export default fetcher;
