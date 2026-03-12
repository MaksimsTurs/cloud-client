import type { Context, ReactNode } from "react";
import type { AuthContextValue, AuthProviderProps, AuthTokens } from "./Auth-Provider.type"

import { createContext, useState } from "react";

export const AuthContext: Context<AuthContextValue | undefined> = createContext<AuthContextValue | undefined>(undefined);

export default function AuthProvider({ children }: AuthProviderProps): ReactNode {
  const [tokens, setTokens] = useState<AuthTokens>({ access: undefined, refresh: undefined });
  const [isAuthorizing, setIsAuthorizing] = useState<boolean>(false);
  
  const value: AuthContextValue = {
    isAuthorizing,
    tokens,
    setTokens,
    setIsAuthorizing,
  };

  return <AuthContext value={value}>{children}</AuthContext>;
};
