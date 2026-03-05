import { APP_TYPE, ASSETS_INCLUDE_EXTENSIONS } from "./app.const";

import type { Plugin, PluginOption } from "vite";

import { defineConfig as viteConfig } from "vite";

import vite from "./vite/vite";
import resolve from "./vite/utils/resolve.util";

const DEV_PLUGINS: (Plugin<any> | Plugin<any>[])[] = [
  vite.plugins.webFont([]),
  vite.plugins.reactSwc(),
];

const PROD_PLUGINS: (Plugin<any> | PluginOption[])[] = [
  vite.plugins.webFont([]),
  vite.plugins.reactSwc(),
  vite.plugins.imageMin(),
  vite.plugins.htmlPlugin(),
  vite.plugins.detectDuplicateDeps(),
  vite.plugins.optimizeCssModule(),
];

export default viteConfig(function({ mode }) {
  const isDev: boolean = mode === "development" ? true : false;

  return {
    root:          resolve("src"),
    publicDir:     resolve("public"),
    assetsInclude: ASSETS_INCLUDE_EXTENSIONS,
    resolve: vite.options.resolve({
      "@root":      resolve("src/"),
      "@public":    resolve("src/public"),
      "@feature":   resolve("src/features"),
      "@reducer":   resolve("src/reducers"),
      "@util":      resolve("src/utils"),
      "@hook":      resolve("src/hooks"),
      "@service":   resolve("src/services"),
      "@component": resolve("src/components"),
      "@ui":        resolve("src/ui"),
      "@page":      resolve("src/pages"),		
      "@scss":      resolve("src/scss"),
    }),
    css:     vite.options.css(),
    server:  vite.options.server(),
    build:   vite.options.build(),
    appType: APP_TYPE,
    plugins: isDev ? DEV_PLUGINS : PROD_PLUGINS
  };
});
