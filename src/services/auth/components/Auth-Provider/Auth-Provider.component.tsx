import type { Context, PropsWithChildren, ReactNode } from "react";
import type { AuthContextValue, AuthTokens } from "./Auth-Provider.type"

import { createContext, useState } from "react";

export const AuthContext: Context<AuthContextValue | undefined> = createContext<AuthContextValue | undefined>(undefined);

export default function AuthProvider({ children }: PropsWithChildren): ReactNode {
  const [tokens, setTokens] = useState<AuthTokens>({ access: undefined, refresh: undefined });
  const [isAuthorizing, setIsAuthorizing] = useState<boolean>(false);
  const [hasAuthorized, setHasAuthorized] = useState<boolean>(false);

  const value: AuthContextValue = {
    isAuthorizing,
    hasAuthorized,
    tokens,
    setTokens,
    setIsAuthorizing,
    setHasAuthorized,
  };

  return <AuthContext value={value}>{children}</AuthContext>;
};
