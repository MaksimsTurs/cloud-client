import { test, expect } from "vitest";

import getParamsFromPath from "../utils/get-params-from-path.util";

test("Create a object of params from valid URL path.", function() {
  expect(getParamsFromPath("/path", "/path"))
    .toStrictEqual({});
  expect(getParamsFromPath("/path/:id", "/path/120"))
    .toStrictEqual({ id: "120" });
  expect(getParamsFromPath("/path/:id/:id", "/path/120/110"))
    .toStrictEqual({ id: "110" });
  expect(getParamsFromPath("/path/:userId/:articleId", "/path/120/110"))
    .toStrictEqual({ userId: "120", articleId: "110" });
  expect(getParamsFromPath("/:userId/:articleId", "/120/110"))
    .toStrictEqual({ userId: "120", articleId: "110" });
});

test("Create a object of params from invalid URL path", function() {
  expect(() => getParamsFromPath("/path/:articleId", "/path/120/110"))
    .toThrow(`Path pattern "/path/:articleId" does not match path "/path/120/110"!`);
});
