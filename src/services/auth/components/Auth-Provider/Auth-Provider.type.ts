import type { Dispatch, PropsWithChildren, SetStateAction } from "react";

export type AuthContextValue = {
  isAuthorizing: boolean

  tokens: AuthTokens

  user: unknown

  setTokens: Dispatch<SetStateAction<AuthTokens>>
  setUser: Dispatch<SetStateAction<unknown>>
  setIsAuthorizing: Dispatch<SetStateAction<boolean>>
};

export type AuthProviderProps = PropsWithChildren;

export type AuthTokens = {
  refresh?: string
  access?:  string
};
