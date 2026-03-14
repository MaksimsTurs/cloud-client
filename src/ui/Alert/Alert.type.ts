import type { PropsWithChildren } from "react";

export type AlertListProps = PropsWithChildren<{
  type: AlertTypes
  title?: string
}>;

export type AlertListItemProps = {
  text: string
};

export type AlertContainerProps = PropsWithChildren<{
  type: AlertTypes
  title?: string
}>;

export type AlertTypes = "info" | "warning" | "caution";
