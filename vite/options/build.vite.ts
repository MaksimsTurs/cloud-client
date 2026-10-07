import type { BuildEnvironmentOptions } from "vite"

import resolve from "../utils/resolve.util.ts";
import isHasAssetExtension from "../utils/is-has-asset-extension.util.ts";

export default function(): BuildEnvironmentOptions {
  return {
		target:               "esnext",
		cssTarget:            "esnext",
		minify:               "oxc",
    cssCodeSplit:         false,
		sourcemap:            false,
		outDir:               resolve("output"),
		emptyOutDir:          true,
		reportCompressedSize: false,
		rolldownOptions: {
			input: resolve("src/index.html"),
			output: {
				chunkFileNames(chunkInfo) {
          let path: string = "";

          if(chunkInfo.facadeModuleId) {
            const names: string[] = chunkInfo.facadeModuleId.split("/");
            const name: string = names.at(names.length - 2)!;
            path = `assets/js/${name}.js`;
          } else {
            path = `assets/js/${chunkInfo.name}`;
          }
          
          return path;
				},
				assetFileNames(chunkInfo) {
					const name: string = chunkInfo.names.at(0)!;

					if(isHasAssetExtension("css", name)) {
						return `assets/css/${name}`;
					} else if(isHasAssetExtension("woff2", name)) {
						return `assets/fonts/${name}`;
					}
					
					return name;		
				},
			}
		}
	};
};

