import type { ReactRouterContextValue } from "./types/use-react-router.type";
import type { UsePathReturn } from "./types/use-path.type";

import { ReactRouterContext } from "./components/Routes.component";

import { useContext } from "react";

export default function usePath(): UsePathReturn {
  const context: ReactRouterContextValue<any> | undefined = useContext<ReactRouterContextValue<any> | undefined>(ReactRouterContext);

  if(!context) {
    throw new TypeError("[usePath]: You should wrapp you App into Routes component!");
  }

  return context.paths.at(-1);
};
