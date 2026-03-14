import { isInstanceOf, isUndefined } from "@util/is.util";
import { HTTPProcessResponseAs } from "../http.type";

export const isResponseJson = (contentType: string): boolean => /application\/json/.test(contentType);

export const isResponseText = (contentType: string): boolean => /text\/.+/.test(contentType);

export const isResponseBuffer = (contentType: string): boolean => {
  return(
    /image\/.+/.test(contentType) ||
    /video\/.+/.test(contentType) ||
    /audio\/.+/.test(contentType) ||
    (!isResponseJson(contentType) && /application\/.+/.test(contentType)) ||
    /font\/.+/.test(contentType) ||
    /model\/.+/.test(contentType)
  );
};

export const isContentTypeMatchProcessAs = (contentType: string, processAs?: HTTPProcessResponseAs): boolean => {
  if(isUndefined(processAs) && isResponseBuffer(contentType)) {
    return false;
  }

  if(isUndefined(processAs) && (isResponseJson(contentType) || isResponseText(contentType))) {
    return true;
  }

  return(
    (isResponseBuffer(contentType) && processAs !== "json") ||
    isResponseText(contentType) ||
    (isResponseJson(contentType) && (processAs === "text" || processAs === "json"))
  );
};

export const isTypedArray = (body: unknown): boolean => (
  isInstanceOf(body, Int8Array) ||
  isInstanceOf(body, Uint8Array) ||
  isInstanceOf(body, Uint8ClampedArray) ||
  isInstanceOf(body, Int16Array) ||
  isInstanceOf(body, Uint16Array) ||
  isInstanceOf(body, Int32Array) ||
  isInstanceOf(body, Uint32Array) ||
  isInstanceOf(body, BigInt64Array) ||
  isInstanceOf(body, BigUint64Array) ||
  isInstanceOf(body, Float16Array) ||
  isInstanceOf(body, Float32Array) ||
  isInstanceOf(body, Float64Array)
);
