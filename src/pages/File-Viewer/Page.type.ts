import type { FEItem } from "@feature/file-explorer/reducers/file-explorer/file-explorer.type";
import type { PropsWithChildren } from "react";

export type SideMenuContainerProps = PropsWithChildren;

export type SideMenuSectionProps = {
  name: string
  value: string
};

export type ImageRendererProps = {
  data: FEItemPreivew
};

export type VideoRendererProps = {
  data: FEItemPreivew
};

export type AudioRendererProps = {
  data: FEItemPreivew
};

export type TextRendererProps = {
  data: FEItemPreivew
};

export type FEItemPreivew = {
  buffer: {
    type: "Buffer"
    data: number[]
  }
} & FEItem;
