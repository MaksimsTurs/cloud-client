import type { PropsWithChildren } from "react";

export type SideMenuContainerProps = PropsWithChildren;

export type SideMenuSectionProps = {
  name: string
  value: string
};

export type ImageRendererProps = {
  data: string
};

export type VideoRendererProps = {
  data: string
};

export type AudioRendererProps = {
  data: string
};

export type TextRendererProps = {
  data: string
};
