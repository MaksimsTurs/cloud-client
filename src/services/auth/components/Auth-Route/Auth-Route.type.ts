import type { PropsWithChildren } from "react";
import type { UseAuthEndpointResponse } from "../../hooks/use-auth.type";

export type AuthRouteProps = PropsWithChildren<{
  onEnter?: () => Promise<UseAuthEndpointResponse>
}>;
