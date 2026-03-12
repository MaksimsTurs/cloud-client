import type { PropsWithChildren } from "react";

export type RouteProps<P extends string> = PropsWithChildren<{
  path:      P
}>;
