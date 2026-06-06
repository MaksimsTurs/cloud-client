import type { PropsWithChildren } from "react";

export type ErrorBoundaryProps = PropsWithChildren;

export type ErrorBoundaryState = {
  hasError: boolean
};
