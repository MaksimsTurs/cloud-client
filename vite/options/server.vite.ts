import type { ServerOptions } from "vite";

import resolve from "../utils/resolve.util";

export default function(): ServerOptions {
  return {
    open: true, 
    port: 3000,
    warmup: { clientFiles: [resolve("src/**/*.*")] }
  };
};