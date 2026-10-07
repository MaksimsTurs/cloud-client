import type { CSSOptions } from "vite";

import resolve from "../utils/resolve.util.ts";

export default function(): CSSOptions {
  return {
    transformer:            "postcss",
    devSourcemap:           true,
    preprocessorMaxWorkers: true,
    postcss:                resolve("postcss.config.ts"),
		modules: {
			scopeBehaviour: "local"
		},
  };
};
