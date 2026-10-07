import type { Plugin } from "vite";

import react from "@vitejs/plugin-react";

export default function(): Plugin[] {
  return react();
};
