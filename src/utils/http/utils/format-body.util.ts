import type { HTTPRequestBody } from "../http.type";

import { 
  isArray,
  isInstanceOf,
  isNull,
  isObject,
  isUndefined,
} from "@util/is.util";
import { isTypedArray } from "./is.util";

export default function formatBody(body?: any): HTTPRequestBody {
  if(!isUndefined(body) && !isNull(body)) {
    if(isObject(body) || isArray(body)) {
      return JSON.stringify(body);
    }

    if(!isTypedArray(body) && 
       !(body)?.toString &&
       !isInstanceOf(body, File) &&
       !isInstanceOf(body, Blob) &&
       !isInstanceOf(body, FormData) &&
       !isInstanceOf(body, DataView) &&
       !isInstanceOf(body, URLSearchParams)) {
      throw new Error("The body object should have a toString function so that it can be formatted correctly.");
    }
  }

  return body;
};
