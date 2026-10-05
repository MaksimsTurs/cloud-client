import type { PropsWithChildren, ReactNode } from "react";
import type { UseAuthEndpointResponse } from "../../hooks/use-auth.type";
import type { UseWithAuthEndpointResponse } from "../../hooks/use-with-auth.type";

export type AuthRouteProps = PropsWithChildren<{
  auth: () => Promise<UseAuthEndpointResponse>
  generateRefreshToken: () => Promise<UseWithAuthEndpointResponse>
  fallback: ReactNode
  loader: ReactNode
}>;
