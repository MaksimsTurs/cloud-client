import type { Constructable } from "@root/global.type";

export const isString     = (something: any): something is string => typeof something === "string";
export const isNumber     = (something: any): something is number => typeof something === "number";
export const isBoolean    = (something: any): something is boolean => typeof something === "boolean";
export const isUndefined  = (something: any): something is undefined => something === undefined;
export const isNull       = (something: any): something is null => something === null;
export const isArray      = <T = any>(something: any): something is T[] => Array.isArray(something);
export const isObject     = <T extends Record<any, any>>(something: any): something is T => Object.getPrototypeOf(something) === Object.prototype && !isArray(something);
export const isFunction   = <T = any>(something: any): something is T => typeof something === "function";
export const isBigNumber  = (something: any): something is bigint => typeof something === "bigint";
export const isSymbol     = (something: any): something is symbol => typeof something === "symbol";
export const isInstanceOf = <T extends Constructable>(maybeInstance: any, Constructor: T): maybeInstance is InstanceType<T> => maybeInstance instanceof Constructor;
export const isPrimitive  = (something: any): boolean => (
  isString(something)    ||
  isNumber(something)    ||
  isNull(something)      ||
  isUndefined(something) ||
  isBoolean(something)   ||
  isBigNumber(something) ||
  isSymbol(something)    
);

const MIME_TYPES = {
  TEXT:   "text/*",
  VIDEO:  "video/*",
  AUDIO:  "audio/*",
  IMAGE:  "image/*",
  BINARY: "application/octet-stream"
};

export const isMimeTypeText = (mimeType: string): boolean => {
  return(
    new RegExp(MIME_TYPES.TEXT).test(mimeType) ||
    mimeType === "application/json"
  );
};

export const isMimeTypeVideo = (mimeType: string): boolean => {
  return new RegExp(MIME_TYPES.VIDEO).test(mimeType);
};

export const isMimeTypeAudio = (mimeType: string): boolean => {
  return new RegExp(MIME_TYPES.AUDIO).test(mimeType);
};

export const isMimeTypeImage = (mimeType: string): boolean => {
  return new RegExp(MIME_TYPES.IMAGE).test(mimeType);
};

export const isMimeTypeBinary = (mimeType: string): boolean => {
  return MIME_TYPES.BINARY === mimeType;
};
