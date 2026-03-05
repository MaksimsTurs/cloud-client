import type { CookieHelper } from "./cookie.type";

import get from "./get.util";
import set from "./set.util";
import remove from "./remove.util";

const cookie: CookieHelper = {
	MAX_AGE: [
		// Days.
		86400,
		172800,
		259200,
		345600,
		424800,
		511200,
		// Weeks.
		597600
	],
  get,
  set,
	remove
};

export default cookie;