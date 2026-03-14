import type { SerializedError } from "@root/global.type";

import HTTPError from "./http/errors/HTTP-Error.error";

import { isInstanceOf, isObject } from "./is.util";

export default async function serializeError(error: unknown): Promise<SerializedError> {
  if(isInstanceOf(error, HTTPError)) {
    const contentType: string | null = error.response.headers.get("Content-Type");

    if(isJson(contentType)) {
      const json = await error.response.json();
      return { code: json.code, message: json.message };
    }

    return { message: "Unknown server error!" };
  } else if(isInstanceOf(error, Error)) {
    return { message: error.message };
  } else if(isObject(error)) {
    if(Object.hasOwn(error, "message") && Object.hasOwn(error, "code")) {
      return { message: error.message, code: error.code };
    }
  }

  return { message: "Unknown client error!" };
};

function isJson(contentType: string | null): boolean {
  if(!contentType) {
    return false;
  }

  return /application\/json/.test(contentType);
};
