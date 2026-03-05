import type { Plugin } from "vite";

import imagemin from "unplugin-imagemin/vite";

export default function(): Plugin<any> {
  return imagemin();
};