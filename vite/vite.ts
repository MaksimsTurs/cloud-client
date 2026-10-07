import build   from "./options/build.vite.ts";
import css     from "./options/css.vite.ts";
import resolve from "./options/resolve.vite.ts";
import server  from "./options/server.vite.ts";

import optimizeCssModule   from "./plugins/optimize-css-module.vite.ts";
import react               from "./plugins/react.vite.ts";
import webFont             from "./plugins/web-font.vite.ts";

export default {
  options: {
    build,
    css,
    resolve,
    server,
  },
  plugins: {
    optimizeCssModule,
    react,
    webFont
  }
};
