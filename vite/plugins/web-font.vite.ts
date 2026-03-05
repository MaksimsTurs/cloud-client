import type { Plugin } from "vite";

import viteWebFont from "vite-plugin-webfont-dl";

export default function(fonts: string[]): Plugin {
  return viteWebFont(fonts, { injectAsStyleTag: true,  embedFonts: false });
};