import type { ReactNode } from "react";
import type { ImageRendererProps } from "../Page.type";

export default function ImageRenderer({ data }: ImageRendererProps): ReactNode {
  const bytes: Uint8Array<ArrayBuffer> = new Uint8Array(data.buffer.data);
  const blob: Blob = new Blob([bytes.buffer], { type: data.mime_type });
  const url: string = URL.createObjectURL(blob);

  return <img src={url}/>;
};
