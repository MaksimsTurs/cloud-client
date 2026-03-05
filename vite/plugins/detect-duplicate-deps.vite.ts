import type { Plugin } from "vite";

import detectDuplicatedDeps from "unplugin-detect-duplicated-deps/vite"

export default function(): Plugin<any> | Plugin<any>[] {
  return detectDuplicatedDeps({ deep: true, throwErrorWhenDuplicated: true });
};