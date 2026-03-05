import build   from "./options/build.vite";
import css     from "./options/css.vite";
import resolve from "./options/resolve.vite";
import server  from "./options/server.vite";

import detectDuplicateDeps from "./plugins/detect-duplicate-deps.vite";
import htmlPlugin          from "./plugins/html-plugin.vite";
import imageMin            from "./plugins/image-min.vite";
import optimizeCssModule   from "./plugins/optimize-css-module.vite";
import reactSwc            from "./plugins/react-swc.vite";
import webFont             from "./plugins/web-font.vite";

export default {
  options: {
    build,
    css,
    resolve,
    server,
  },
  plugins: {
    detectDuplicateDeps,
    htmlPlugin,
    imageMin,
    optimizeCssModule,
    reactSwc,
    webFont
  }
};