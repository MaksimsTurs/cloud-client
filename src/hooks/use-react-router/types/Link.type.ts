import type { JSX, PropsWithChildren } from "react"

export type LinkProps<P extends string> = PropsWithChildren<{
  href: P
} & JSX.IntrinsicElements["a"]>