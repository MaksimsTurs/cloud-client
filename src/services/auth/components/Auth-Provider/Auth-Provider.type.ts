import type { Dispatch, SetStateAction } from "react";

export type AuthContextValue = {
  isAuthorizing: boolean
  hasAuthorized: boolean

  tokens: AuthTokens

  setTokens: Dispatch<SetStateAction<AuthTokens>>
  setIsAuthorizing: Dispatch<SetStateAction<boolean>>
  setHasAuthorized: Dispatch<SetStateAction<boolean>>
};

export type AuthTokens = {
  refresh?: string
  access?:  string
};
