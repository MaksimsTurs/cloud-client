import cssnano from "cssnano";
import postcssenv from "postcss-preset-env";
import postcssCombineDupicatedSelectors from "postcss-combine-duplicated-selectors";
import postcssCalc from "postcss-calc";

export default {
  plugins: [
    postcssenv(),
    postcssCalc({ precision: false, warnWhenCannotResolve: true }),
    postcssCombineDupicatedSelectors({ removeDuplicatedProperties: true }),
    cssnano(),
  ]
};
