import type { CookieSetOptions } from "./cookie.type";

import { G_COOKIE_REGEXP_TEXT_VALIDATION } from "./REGEXP.const";

import { isNumber } from "../is.util";

export default function set(key: string, value: string, options?: CookieSetOptions): void {
	let optionString: string = "";

	if(G_COOKIE_REGEXP_TEXT_VALIDATION.test(value)) {
		throw new Error("[Cookie]: Set value contains unsafe value!");
	}

	if(options?.path) {
		if(G_COOKIE_REGEXP_TEXT_VALIDATION.test(options.path)) {
			throw new Error("[Cookie]: Path contains unsafe string!");
		}

		optionString += `path=${options.path};`;
	}

	if(options?.maxAge) {
		if(!isNumber(options.maxAge)) {
			throw new TypeError(`[Cookie]: options.maxAge is not of type \"number\" but type of "${options.maxAge}"`);
		}

		optionString += `max-age=${options.maxAge}`;
	}

	document.cookie = `${key}=${value};${optionString}`;
};