import type { Plugin } from "vite";

import reactSWC from "@vitejs/plugin-react-swc";

export default function(): Plugin[] {
  return reactSWC({ devTarget: "esnext" });
};