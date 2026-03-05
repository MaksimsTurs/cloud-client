import { defineConfig } from "vitest/config";

import resolve from "./vite/utils/resolve.util";

export default defineConfig(() => {
  return {
    test: {
      onConsoleLog: function(log: string): boolean {
        if(log) {
          return false;
        }

        return true;
      },
      environment:  "jsdom",
      isolate:      true,
      include:      ["./src/**/*.test.*"],
      clearMocks:   true,
      restoreMocks: true,
      mockReset:    true,
      exclude: [
        "**/node_modules/**", 
        "**/output/**", 
        "**/.{idea,git,cache,output,temp}/**", 
        "**/{vite,vitest}.config.*"
      ],
      alias: {
        "@root":      resolve("src/"),

        "@public":    resolve("src/public"),
        
        "@feature":   resolve("src/features"),
        "@reducer":   resolve("src/reducers"),
        "@util":      resolve("src/utils"),
        "@hook":      resolve("src/hooks"),
        
        "@component": resolve("src/components"),
        "@ui":        resolve("src/ui"),
        "@page":      resolve("src/pages"),
        
        "@scss":      resolve("src/scss"),
      }
    },
  };
});
