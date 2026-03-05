import { test, expect } from "vitest";

import isPathMatchPattern from "../utils/is-path-match-pattern.util";

test("Check if the path match a pattern.", function() {
  expect(isPathMatchPattern("/path", "/pat"))
    .toBe(false);
  expect(isPathMatchPattern("/path/:article", "/path/Musterman/120"))
    .toBe(false);
  expect(isPathMatchPattern("/:user/:article", "/path/Musterman/120"))
    .toBe(false);
  expect(isPathMatchPattern("/path", "/path"))
    .toBe(true);
  expect(isPathMatchPattern("/:id", "/120"))
    .toBe(true);
  expect(isPathMatchPattern("/:id/path", "/120/path"))
    .toBe(true);
  expect(isPathMatchPattern("/path/:id", "/path/120"))
    .toBe(true);
  expect(isPathMatchPattern("/path/120", "/path/120"))
    .toBe(true);
  expect(isPathMatchPattern("/path/:user/:article", "/path/Musterman/120"))
    .toBe(true);
});