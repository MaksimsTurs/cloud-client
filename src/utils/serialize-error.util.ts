import { isInstanceOf, isObject } from "./is.util";
import { inObject } from "./std/std.util";

export default function serializeError(error: unknown) {
  if(isInstanceOf(error, Error)) {
    return { message: error.message };
  } else if(isObject(error)) {
    if(inObject(["message", "code"], error)) {
      return { message: error.message, code: error.code };
    }
  }

  return { message: "Unknown error!" };
};
