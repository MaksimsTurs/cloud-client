import type { ServerOptions } from "vite";

import resolve from "../utils/resolve.util.ts";

export default function(): ServerOptions {
  return {
    open: true, 
    port: 3000,
    warmup: { clientFiles: [resolve("src/**/*.*")] }
  };
};
