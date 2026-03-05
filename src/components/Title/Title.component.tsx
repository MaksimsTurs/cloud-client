import type { PropsWithChildren, ReactNode } from "react";

export default function Title({ children }: PropsWithChildren): ReactNode {
  return <title>{children}</title>
};
