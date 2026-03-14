import type { AuthContextValue } from "../components/Auth-Provider/Auth-Provider.type";

import { useContext } from "react";

import { AuthContext } from "../components/Auth-Provider/Auth-Provider.component";

import { isUndefined } from "@util/is.util";

export default function useAuthIsAuthorized(): boolean {
  const context: AuthContextValue | undefined = useContext<AuthContextValue | undefined>(AuthContext);

  if(isUndefined(context)) {
    throw new TypeError("Wrap you'r application into AuthProvider compontent!");
  }

  return !isUndefined(context.tokens.access) && !isUndefined(context.tokens.refresh);
};
