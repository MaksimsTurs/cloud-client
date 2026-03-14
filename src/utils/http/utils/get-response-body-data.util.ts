import type { HTTPRequestOptions } from "../http.type";

import { isResponseJson, isResponseText, isContentTypeMatchProcessAs } from "./is.util";
import { isUndefined } from "@util/is.util";

import PROCESS_ASS_POSSIBLE_VALUES from "../const/PROCESS-AS-POSSIBLE-VALUES.const";

export default async function getResponseBodyData<T = unknown>(response: Response, options?: HTTPRequestOptions): Promise<T> {
  const contentType: string | null = response.headers.get("Content-Type");

  if(!contentType) {
    throw new Error("Server response does not provide a information about body content type!");
  }

  if(!isContentTypeMatchProcessAs(contentType, options?.processAs)) {
    console.log(contentType, options?.processAs)
    throw new Error(`mime-type(${contentType}) and processAs(${options?.processAs}) option does not match!`);
  }

  if(!isUndefined(options?.processAs)) {
    if(!PROCESS_ASS_POSSIBLE_VALUES.has(options.processAs)) {
      throw new Error(`${options.processAs} is not valid process option!`);
    }

    return await response[options.processAs]() as T;
  }

  if(isResponseJson(contentType)) {
    return await response.json();
  }

  if(isResponseText(contentType)) {
    return await response.text() as T;
  }

  throw new Error("The response body is a binary, set processAs option to \"arrayBuffer\", \"bytes\", or \"blob\"!")
};
