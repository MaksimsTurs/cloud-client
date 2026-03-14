import type { AnyCallback } from "../scall.type";

export const isAsync = (callback: AnyCallback): boolean => callback.constructor.name === "AsyncFunction";
