import type { HTTPRequestHeaders } from "../http.type.ts";

import { isObject, isInstanceOf, isArray } from "@util/is.util.ts";
import { isTypedArray } from "./is.util.ts";

export default function formatHeaders(userHeaders?: HTTPRequestHeaders, body?: any): Headers {
  const headers: Headers = new Headers(userHeaders);
  
  if(body) {
    if(isObject(body) || isArray(body)) {
      headers.set("Content-Type", "application/json");
    } else if(isInstanceOf(body, ArrayBuffer) ||
              isInstanceOf(body, Blob) ||
              isInstanceOf(body, DataView) ||
              isTypedArray(body)) {
      headers.set("Content-Type", "application/octet-stream")
    }
  }

  return headers;
};
