import type { ReactRouterContextValue } from "./types/use-react-router.type";
import type { UseNavigateReturn } from "./types/use-navigate.type";

import { useContext } from "react";

import { ReactRouterContext } from "./components/Routes.component";

export default function useNavigate(): UseNavigateReturn {
  const context: ReactRouterContextValue<any> | undefined = useContext<ReactRouterContextValue<any> | undefined>(ReactRouterContext);
  
  if(!context) {
    throw new Error("You should wrapp you App into Routes component!");
  }

  return function(to: string | -1): void {
    if(typeof to === "string") {
      history.pushState(null, "", to);
      context.pushPath(to);
    } else if(to === -1) {
      history.back();
      context.popPath();
    }
  };
};
