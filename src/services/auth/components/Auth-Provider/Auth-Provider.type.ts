import type { Dispatch, PropsWithChildren, SetStateAction } from "react";
import type { UseAuthEndpointResponse } from "../../hook/use-auth.type";

export type AuthContextValue = {
  isAuthorizing: boolean

  tokens: AuthTokens

  setTokens: Dispatch<SetStateAction<AuthTokens>>
  setIsAuthorizing: Dispatch<SetStateAction<boolean>>
};

export type AuthProviderProps = PropsWithChildren;

export type AuthTokens = {
  refresh?: string
  access?:  string
};
