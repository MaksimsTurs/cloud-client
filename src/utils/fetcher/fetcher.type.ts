import { FetcherHeaderKeys } from "./fetcher.enum";

export type Fethcer = {
  base?: string
  get:   FetcherGet
  post:  FetcherPost
};

export type FetcherHeaders = Partial<Record<FetcherHeaderKeys, string>>;

export type FormatedInit = {
  body: any | null
  headers: FetcherHeaders | null
};

export type FetcherOptions = {
  headers?: FetcherHeaders
  as?: FetcherAs
} & Omit<RequestInit, "method" | "body" | "headers">;

export type FetcherResponse<R = any, E = any> = {
  data?: R
  error?: E
  headers: Headers
};

type FetcherAs = "text" | "json" | "blob";

type FetcherGet = <R = unknown, E = unknown>(url: string, options?: FetcherOptions) => Promise<FetcherResponse<R, E>>;

type FetcherPost = <R = unknown, E = unknown>(url: string, body?: any, options?: FetcherOptions) => Promise<FetcherResponse<R, E>>;
