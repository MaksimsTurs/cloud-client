import cssnano                          from "cssnano";
import postcssenv                       from "postcss-preset-env";
import postcssCombineDupicatedSelectors from "postcss-combine-duplicated-selectors";
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
    cssnano({ preset: "cssnano-preset-advanced" }),
  ]
};
