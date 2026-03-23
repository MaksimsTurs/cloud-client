import { expect, test } from "vitest";

import { 
  isString, 
  isNumber,
  isBoolean,
  isUndefined,
  isNull,
  isArray,
  isObject,
  isFunction,
  isBigNumber,
  isSymbol,
  isInstanceOf,
  isPrimitive
} from "../is.util";

test("Test \"isString\".", function() {
  expect(isString("Some string")).toBe(true);
  expect(isString(Symbol("symbol"))).toBe(false);
  expect(isString(0)).toBe(false);
  expect(isString(function() {})).toBe(false);
  expect(isString([])).toBe(false);
  expect(isString(null)).toBe(false);
  expect(isString(false)).toBe(false);
  expect(isString(undefined)).toBe(false);
  expect(isString(new Map())).toBe(false);
  expect(isString({})).toBe(false);
});

test("Test \"isNumber\".", function() {
  expect(isNumber(0)).toBe(true);
  expect(isNumber(Symbol("symbol"))).toBe(false);
  expect(isNumber(null)).toBe(false);
  expect(isNumber(function() {})).toBe(false);
  expect(isNumber(false)).toBe(false);
  expect(isNumber([])).toBe(false);
  expect(isNumber(undefined)).toBe(false);
  expect(isNumber(new Map())).toBe(false);
  expect(isNumber({})).toBe(false);
  expect(isNumber("Some string")).toBe(false);
});

test("Test \"isBoolean\".", function() {
  expect(isBoolean(false)).toBe(true);
  expect(isBoolean(Symbol("symbol"))).toBe(false);
  expect(isBoolean(function() {})).toBe(false);
  expect(isBoolean(0)).toBe(false);
  expect(isBoolean(null)).toBe(false);
  expect(isBoolean([])).toBe(false);
  expect(isBoolean(undefined)).toBe(false);
  expect(isBoolean(new Map())).toBe(false);
  expect(isBoolean({})).toBe(false);
  expect(isBoolean("Some string")).toBe(false);
});

test("Test \"isUndefined\".", function() {
  expect(isUndefined(undefined)).toBe(true);
  expect(isUndefined(Symbol("symbol"))).toBe(false);
  expect(isUndefined(function() {})).toBe(false);
  expect(isUndefined(false)).toBe(false);
  expect(isUndefined(0)).toBe(false);
  expect(isUndefined([])).toBe(false);
  expect(isUndefined(null)).toBe(false);
  expect(isUndefined(new Map())).toBe(false);
  expect(isUndefined({})).toBe(false);
  expect(isUndefined("Some string")).toBe(false);
});

test("Test \"isNull\".", function() {
  expect(isNull(null)).toBe(true);
  expect(isNull(Symbol("symbol"))).toBe(false);
  expect(isNull(undefined)).toBe(false);
  expect(isNull(function() {})).toBe(false);
  expect(isNull(false)).toBe(false);
  expect(isNull(0)).toBe(false);
  expect(isNull(new Map())).toBe(false);
  expect(isNull({})).toBe(false);
  expect(isNull("Some string")).toBe(false);
});

test("Test \"isArray\".", function() {
  expect(isArray([])).toBe(true);
  expect(isArray(null)).toBe(false);
  expect(isArray(Symbol("symbol"))).toBe(false);
  expect(isArray(undefined)).toBe(false);
  expect(isArray(function() {})).toBe(false);
  expect(isArray(false)).toBe(false);
  expect(isArray(0)).toBe(false);
  expect(isArray(new Map())).toBe(false);
  expect(isArray({})).toBe(false);
  expect(isArray("Some string")).toBe(false);
});

test("Test \"isObject\".", function() {
  expect(isObject({})).toBe(true);
  expect(isObject(new Map())).toBe(false);
  expect(isObject(Symbol("symbol"))).toBe(false);
  expect(isObject([])).toBe(false);
  expect(isObject(function() {})).toBe(false);
  expect(isObject(false)).toBe(false);
  expect(isObject(0)).toBe(false);
  expect(isObject("Some string")).toBe(false);
});

test("Test \"isFunction\".", function() {
  expect(isFunction(function() {})).toBe(true);
  expect(isFunction({})).toBe(false);
  expect(isFunction(Symbol("symbol"))).toBe(false);
  expect(isFunction([])).toBe(false);
  expect(isFunction(null)).toBe(false);
  expect(isFunction(undefined)).toBe(false);
  expect(isFunction(false)).toBe(false);
  expect(isFunction(0)).toBe(false);
  expect(isFunction(new Map())).toBe(false);
  expect(isFunction("Some string")).toBe(false);
});

test("Test \"isBigNumber\".", function() {
  expect(isBigNumber(9007199254740991n)).toBe(true);
  expect(isBigNumber(Symbol("symbol"))).toBe(false);
  expect(isBigNumber(function() {})).toBe(false);
  expect(isBigNumber({})).toBe(false);
  expect(isBigNumber([])).toBe(false);
  expect(isBigNumber(null)).toBe(false);
  expect(isBigNumber(undefined)).toBe(false);
  expect(isBigNumber(false)).toBe(false);
  expect(isBigNumber(0)).toBe(false);
  expect(isBigNumber(new Map())).toBe(false);
  expect(isBigNumber("Some string")).toBe(false);
});

test("Test \"isSymbol\".", function() {
  expect(isSymbol(Symbol("symbol"))).toBe(true);
  expect(isSymbol(9007199254740991n)).toBe(false);
  expect(isSymbol(function() {})).toBe(false);
  expect(isSymbol({})).toBe(false);
  expect(isSymbol([])).toBe(false);
  expect(isSymbol(null)).toBe(false);
  expect(isSymbol(undefined)).toBe(false);
  expect(isSymbol(false)).toBe(false);
  expect(isSymbol(0)).toBe(false);
  expect(isSymbol(new Map())).toBe(false);
  expect(isSymbol("Some string")).toBe(false);
});

test("Test \"isPrimitive\".", function() {
  expect(isPrimitive(Symbol("symbol"))).toBe(true);
  expect(isPrimitive(9007199254740991n)).toBe(true);
  expect(isPrimitive(function() {})).toBe(false);
  expect(isPrimitive({})).toBe(false);
  expect(isPrimitive([])).toBe(false);
  expect(isPrimitive(null)).toBe(true);
  expect(isPrimitive(undefined)).toBe(true);
  expect(isPrimitive(false)).toBe(true);
  expect(isPrimitive(0)).toBe(true);
  expect(isPrimitive(new Map())).toBe(false);
  expect(isPrimitive("Some string")).toBe(true);
});

test("Test \"isInstanceOf\".", function() {
  expect(isInstanceOf(new Map(), Map)).toBe(true);
  expect(isInstanceOf(Symbol("symbol"), Map)).toBe(false);
  expect(isInstanceOf(9007199254740991n, Map)).toBe(false);
  expect(isInstanceOf(function() {}, Map)).toBe(false);
  expect(isInstanceOf({}, Map)).toBe(false);
  expect(isInstanceOf([], Map)).toBe(false);
  expect(isInstanceOf(null, Map)).toBe(false);
  expect(isInstanceOf(undefined, Map)).toBe(false);
  expect(isInstanceOf(false, Map)).toBe(false);
  expect(isInstanceOf(0, Map)).toBe(false);
  expect(isInstanceOf("Some string", Map)).toBe(false);
});
