import type { PluginOption } from "vite";

import { createHtmlPlugin } from "vite-plugin-html";

export default function(): PluginOption[] {
  return createHtmlPlugin({ minify: true });
};