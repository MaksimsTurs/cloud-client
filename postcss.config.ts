import cssnano                          from "cssnano";
import postcssenv                       from "postcss-preset-env";
import postcssCombineDupicatedSelectors from "postcss-combine-duplicated-selectors";
import postcssClassNameShorter          from "postcss-class-name-shortener";
import postcssCalc                      from "postcss-calc";

export default {
  plugins: [
    postcssenv({
      stage:                        2,
      minimumVendorImplementations: 2,
    }),
    postcssCalc({ precision: false, warnWhenCannotResolve: true }),
    postcssCombineDupicatedSelectors({ 
      removeDuplicatedProperties: true, 
      removeDuplicatedValues: false 
    }),
    postcssClassNameShorter(),
    cssnano({ preset: "cssnano-preset-advanced" }),
  ]
};