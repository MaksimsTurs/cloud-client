import type { ReactNode } from "react";
import type { VideoRendererProps } from "../Page.type";

export default function VideoRenderer({ data }: VideoRendererProps): ReactNode {
  const bytes: Uint8Array<ArrayBuffer> = new Uint8Array(data.buffer.data);
  const blob: Blob = new Blob([bytes.buffer], { type: data.mime_type });
  const url: string = URL.createObjectURL(blob);

  return <video controls src={url}/>;
};
