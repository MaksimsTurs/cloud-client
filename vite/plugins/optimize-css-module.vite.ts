import type { Plugin } from "vite";

import { optimizeCssModules } from "vite-plugin-optimize-css-modules";

export default function(): Plugin {
  return optimizeCssModules();
};