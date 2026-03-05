import type { ParsedCookie } from "./cookie.type.ts";

import {
	G_COOKIE_REGEXP_ITEMS_SPLITTER,
	G_COOKIE_REGEXP_ITEM_SPLITTER
} from "./REGEXP.const.ts";

export default function parse(): ParsedCookie {
	const cookies: ParsedCookie = {};
	const cookieStrings: string[] = document.cookie.split(G_COOKIE_REGEXP_ITEMS_SPLITTER);
	const length: number = cookieStrings.length;

	let index: number = 0;
	
	while(index < length) {
		const formatedString: string = cookieStrings[index].trim();
		const { 0: key, 1: value } = formatedString.split(G_COOKIE_REGEXP_ITEM_SPLITTER);

		cookies[key] = value;

		index++;
	}
	
	return cookies;
};