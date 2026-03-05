import type { PropsWithChildren, ReactNode } from "react";

export type ErrorBoundaryProps = PropsWithChildren<{
  fallbackComponent?: ReactNode
}>;

export type ErrorBoundaryState = {
  hasError: boolean
};