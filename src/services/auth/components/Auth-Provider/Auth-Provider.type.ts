import type { Dispatch, PropsWithChildren, SetStateAction } from "react";

export type AuthContextValue = {
  isAuthorizing: boolean

  tokens: AuthTokens

  setTokens: Dispatch<SetStateAction<AuthTokens>>
  setIsAuthorizing: Dispatch<SetStateAction<boolean>>
};

export type AuthContextProps = PropsWithChildren<{
  onSiteEnter?: () => void;
}>

export type AuthTokens = {
  refresh?: string
  access?:  string
};
