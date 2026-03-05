import type { ReactNode } from "react";
import type { ImageRendererProps } from "../Page.type";

export default function ImageRenderer({ data }: ImageRendererProps): ReactNode {
  return <img src={`${import.meta.env.VITE_BASE_FILE_PATH}/${data}`}/>;
};
