import type { JSX, ReactNode } from "react";

export type HybrideButtonProps = {
  text?: string
  icon?: ReactNode
} & JSX.IntrinsicElements["button"];

export type HybrideButtonSkeletonProps = {
  type: HybrideButtonTypes
};

type HybrideButtonTypes = "text-only" | "icon-only" | "full";
