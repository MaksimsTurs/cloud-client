import type { ReactRouterContextValue } from "./types/use-react-router.type";
import type { UseParamsReturn } from "./types/use-params.type";

import { useContext } from "react";

import { ReactRouterContext } from "./components/Routes.component";

import getParamsFromPath from "./utils/get-params-from-path.util";
import isPathMatchPattern from "./utils/is-path-match-pattern.util";

export default function useParams<P extends string>(): UseParamsReturn<P> {
  const context: ReactRouterContextValue<any> | undefined = useContext<ReactRouterContextValue<any> | undefined>(ReactRouterContext);
  
  if(!context) {
    throw new TypeError("[useParams]: You should wrapp you App into Routes component!");
  }

  const currentPattern: string | undefined = context.patterns
    .keys()
    .filter(pattern => isPathMatchPattern(pattern, context.paths.at(-1)))
    .toArray()
    .at(0);

  return !currentPattern ? {} : getParamsFromPath<P>(currentPattern, context.paths.at(-1))
};