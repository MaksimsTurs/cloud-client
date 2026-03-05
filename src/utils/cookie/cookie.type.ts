import { CookieMaxAges } from "./cookie.enum";

export type CookieHelper = {
	MAX_AGE: CookieMaxAge
  get:     CookieGet
  set: 		 CookieSet
	remove:  CookieRemove
};

export type CookieMaxAge = Record<CookieMaxAges, number>;

export type CookieGet = (key: string) => string | undefined;

export type CookieSet = (key: string, value: any, options?: CookieSetOptions) => void;

export type CookieRemove = (key: string) => void;

export type ParsedCookie = Record<string, string>;

export type CookieSetOptions = {
  maxAge?: number
	path?:   string
};

