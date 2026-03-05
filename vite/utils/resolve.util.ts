import path from "node:path";

import { DIRNAME } from "../../app.const";

export default function resolve(__path: string): string {
  return path.resolve(DIRNAME, __path);
};