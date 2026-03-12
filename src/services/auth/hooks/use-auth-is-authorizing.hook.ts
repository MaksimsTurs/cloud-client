import type { AuthContextValue } from "../components/Auth-Provider/Auth-Provider.type";

import { useContext } from "react";

import { AuthContext } from "../components/Auth-Provider/Auth-Provider.component";

export default function useAuthIsAuthorizing(): boolean {
  const context: AuthContextValue | undefined = useContext<AuthContextValue | undefined>(AuthContext);

  if(!context) {
    throw new Error("Wrap you'r application into AuthProvider compontent!");
  }

  return context.isAuthorizing;
};
