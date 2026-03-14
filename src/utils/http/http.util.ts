import type { HTTPConfiguration, HTTPRequestOptions } from "./http.type";

import makeRequest from "./utils/make-request.util";

export let HTTPConfig: HTTPConfiguration = {};

const http = {
  config: function(config: HTTPConfiguration): void {
    HTTPConfig = {...config };
  },
  get: async function<T = unknown>(path: string, options?: HTTPRequestOptions): Promise<T> {
    return await makeRequest<T>("GET", path, options);
  },
  post: async function<T = unknown>(path: string, options?: HTTPRequestOptions): Promise<T> {
    return await makeRequest<T>("POST", path, options);
  },
  put: async function<T = unknown>(path: string, options?: HTTPRequestOptions): Promise<T> {
    return await makeRequest<T>("PUT", path, options);
  },
  delete: async function<T = unknown>(path: string, options?: HTTPRequestOptions): Promise<T> {
    return await makeRequest<T>("DELETE", path, options); 
  },
  patch: async function<T = unknown>(path: string, options?: HTTPRequestOptions): Promise<T> {
    return await makeRequest<T>("PATCH", path, options); 
  }
};

export default http;
