import { describe, test, expect } from "vitest";

import scall from "../scall/scall.util";

import SCallResult from "../scall/SCall-Result.util";

describe("Test scall with synchronouse callback", function() {
  test("return simple value", function() {
    const res = scall(() => 2 + 2);
    
    expect(res)
      .toBeInstanceOf(SCallResult);
    expect(res.getData())
      .toBe(4);
    expect(res.getError())
      .toBe(undefined);
  });

  test("return error", function() {
    const res = scall(() => {
      throw new Error("error");
    });

    expect(res)
      .toBeInstanceOf(SCallResult);
    expect(res.getData())
      .toBe(undefined);
    expect(res.getError())
      .toBeInstanceOf(Error);
  });

  test("return SCallResult instance with simple value", function() {
    const res = scall(() => {
      return scall(() => 2 + 4);
    });

    expect(res)
      .toBeInstanceOf(SCallResult);
    expect(res.getData())
      .toBe(6);
    expect(res.getError())
      .toBe(undefined);
  });

  test("return SCallResult instance with error", function() {
    const res = scall(() => {
      return scall(() => {
        throw new Error("error");
      });
    });

    expect(res)
      .toBeInstanceOf(SCallResult);
    expect(res.getData())
      .toBe(undefined);
    expect(res.getError())
      .toBeInstanceOf(Error);
  });
});

describe("Test scall with asynchronouse callback", function() {
  test("return simple value", async function() {
    const res = await scall(async() => 2 + 2);
    
    expect(res)
      .toBeInstanceOf(SCallResult);
    expect(res.getData())
      .toBe(4);
    expect(res.getError())
      .toBe(undefined);
  });

  test("return error", async function() {
    const res = await scall(async() => {
      throw new Error("error");
    });

    expect(res)
      .toBeInstanceOf(SCallResult);
    expect(res.getData())
      .toBe(undefined);
    expect(res.getError())
      .toBeInstanceOf(Error);
  });

  test("return SCallResult instance with simple value", async function() {
    const res = await scall(async () => {
      return await scall(async () => 2 + 4);
    });

    expect(res)
      .toBeInstanceOf(SCallResult);
    expect(res.getData())
      .toBe(6);
    expect(res.getError())
      .toBe(undefined);
  });

  test("return SCallResult instance with error", async function() {
    const res = await scall(async () => {
      return await scall(async () => {
        throw new Error("error");
      });
    });

    expect(res)
      .toBeInstanceOf(SCallResult);
    expect(res.getData())
      .toBe(undefined);
    expect(res.getError())
      .toBeInstanceOf(Error);
  });
});
