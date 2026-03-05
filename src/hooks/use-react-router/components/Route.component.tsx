import type { ReactRouterContextValue } from "../types/use-react-router.type";
import type { ReactNode } from "react";
import type { RouteProps } from "../types/Route.type";

import { ReactRouterContext } from "./Routes.component";

import { useContext } from "react";

import { isUndefined } from "@util/is.util";
import isPathMatchPattern from "../utils/is-path-match-pattern.util";

export default function Route<P extends string>({ path, protect, children, fallback }: RouteProps<P>): ReactNode {
  const context: ReactRouterContextValue<P> | undefined = useContext(ReactRouterContext);
  
  if(!context) {
    throw new Error("Route component should be wrapped into Routes component!");
  }
  
  context.addPattern(path);
  
  return(
    isUndefined(protect) ? 
      isPathMatchPattern(path, context.paths.at(-1)) ? 
        children :
      null :
    protect ? 
      fallback : 
      children
  );
};
