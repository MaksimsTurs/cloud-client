import type { AuthContextValue } from "../components/Auth-Provider/Auth-Provider.type";

import { useContext } from "react";

import { AuthContext } from "../components/Auth-Provider/Auth-Provider.component";

import { isUndefined } from "@util/is.util";

export default function useUser<U = unknown>(): U {
  const context: AuthContextValue | undefined = useContext<AuthContextValue | undefined>(AuthContext);

  if(isUndefined(context)) {
    throw new TypeError("You should wrapp you App into Routes component!");
  }

  return context.user as U;
};
