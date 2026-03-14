export type HTTPConfiguration = {
  base?: string
};

export type HTTPRequestOptions<E = unknown> = {
  processAs?: HTTPProcessResponseAs
  headers?: HTTPRequestHeaders
  body?: any
} & E & Omit<RequestInit, "body" | "headers">;

export type HTTPRequestHeaders = Record<string, string>;

export type HTTPRequestBody =
  | string
  | Blob
  | DataView<ArrayBuffer>
  | ArrayBuffer
  | File
  | URLSearchParams
  | FormData
  | Int8Array<ArrayBuffer>
  | Uint8Array<ArrayBuffer>
  | Uint8ClampedArray<ArrayBuffer>
  | Int16Array<ArrayBuffer>
  | Uint16Array<ArrayBuffer>
  | Int32Array<ArrayBuffer>
  | Uint32Array<ArrayBuffer>
  | Float32Array<ArrayBuffer>
  | Float64Array<ArrayBuffer>
  | BigInt64Array<ArrayBuffer>
  | BigUint64Array<ArrayBuffer>;

export type HTTPProcessResponseAs = 
  | "json" 
  | "text" 
  | "arrayBuffer" 
  | "blob" 
  | "bytes";
