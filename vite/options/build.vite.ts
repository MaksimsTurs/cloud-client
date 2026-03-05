import type { BuildEnvironmentOptions, TerserOptions } from "vite"

import resolve from "../utils/resolve.util";
import isHasAssetExtension from "../utils/is-has-asset-extension.util";

import os from "node:os";

export default function(): BuildEnvironmentOptions {
	const terserOptions: TerserOptions | undefined = {
			ecma:            2020,
			maxWorkers:      os.cpus().length - 1,
			safari10:        false,
			ie8:             false,
			keep_fnames:     false,
			keep_classnames: false,
			mangle: {
				eval:            true,
				keep_classnames: false,
				keep_fnames:     false,
				safari10:        false
			},
			compress: {
				passes:          	Number.MAX_SAFE_INTEGER,
				ecma:            	2020,           
				directives:      	true,
				evaluate:        	true,
				hoist_props:     	true,
				join_vars:       	true,
				properties:      	true,
				unsafe_arrows:   	true,
				unsafe_comps:    	true,
				unsafe_Function: 	true,
				unsafe_math:     	true,
				unsafe_methods:  	true,
				unsafe_proto:    	true,
				unsafe_regexp:   	true,
				unsafe_symbols:  	true,
				unsafe_undefined:	true,
				reduce_funcs:    	true,
				side_effects:    	true,
				collapse_vars:   	true,
				arrows:          	true,
				booleans:        	true,
				comparisons:     	true,
				computed_props:  	true,
				conditionals:    	true,
				dead_code:       	true,
				drop_console: 	 	true,
				drop_debugger: 	 	true,
				arguments:       	true,
				if_return:       	true,
				inline:          	true,
				loops:           	true,
				negate_iife:     	true,
				reduce_vars:     	true,
				switches:        	true,
				typeofs:         	true,
				module:          	true,
				toplevel:        	false,
				keep_classnames: 	false,
				keep_fnames:     	false,
				keep_infinity:   	false,
				expression:      	false,
				hoist_funs:      	false,
			},
		}

	return {
		target:               "esnext",
		cssTarget:            "esnext",
		minify:               "terser",
		cssMinify:            "esbuild",
		cssCodeSplit:         true,
		sourcemap:            false,
		outDir:               resolve("output"),
		emptyOutDir:          true,
		reportCompressedSize: false,
		terserOptions,
		rollupOptions: {
			input: resolve("src/index.html"),
			output: {
				chunkFileNames(chunkInfo){
					return `assets/js/${chunkInfo.name}.js`;
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

