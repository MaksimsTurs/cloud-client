import type { PropsWithChildren, ReactNode } from "react";

export type RouteProps<P extends string> = PropsWithChildren<{
  path:      P
  protect?:  boolean
  /** Must be used with `Route.protect` argument. The `Route.fallback` component will be rendered when the protect condition true is. */
  fallback?: ReactNode
}>;