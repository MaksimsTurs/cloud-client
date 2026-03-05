import type { LocalStorageUil } from "./local-storage.type";

import { isPrimitive } from "../is.util";

const LocalStorage: LocalStorageUil = {
  get: function<T = any>(key: string, defaultValue?: string): T | null {
    const item: string | null = localStorage.getItem(key);

    if(item?.startsWith("{") && item.endsWith("}")) {
      return JSON.parse(localStorage.getItem(key) || defaultValue || "null") as T | null
    }

    return item as T;
  },
  set: function<T = any>(key: string, value: T): void {
    if(isPrimitive(value)) {
      localStorage.setItem(key, value as string);
    } else {
      localStorage.setItem(key, JSON.stringify(value))
    }
  },
  remove: function(key: string): void {
    localStorage.removeItem(key)
  }
};

export default LocalStorage;