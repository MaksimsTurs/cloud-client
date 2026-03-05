import { expect, test, vi } from "vitest";

import cookie from "../cookie/cookie.util";
import parse from "../cookie/parse.util";

const DOM_COOKIE_NAME_VALUE  = "Musterman";
const DOM_COOKIE_TOKEN_VALUE = "c34nc3ncnücn1ünrk-cwo´$))$§oejf4";
const DOM_COOKIE             = `name=${DOM_COOKIE_NAME_VALUE}; token=${DOM_COOKIE_TOKEN_VALUE}`;

test("Parsing DOM cookie.", function() {
  vi
    .spyOn(document, "cookie", "get")
    .mockReturnValue(DOM_COOKIE),

  expect(parse())
    .toStrictEqual({ 
      name:  DOM_COOKIE_NAME_VALUE, 
      token: DOM_COOKIE_TOKEN_VALUE
    });
});

test("Parsing and get DOM cookie value.", function() {
  vi
    .spyOn(document, "cookie", "get")
    .mockReturnValue(DOM_COOKIE);

  expect(cookie.get("name")).eq(DOM_COOKIE_NAME_VALUE);
});

test("Set DOM cookie value", function() {
  vi.spyOn(document, "cookie", "set")
    
  cookie.set("name", DOM_COOKIE_NAME_VALUE, {});
  cookie.set("token", DOM_COOKIE_TOKEN_VALUE, {});

  expect(document.cookie).eq(DOM_COOKIE);
});