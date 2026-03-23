import type { ReactNode } from "react";
import type { AudioRendererProps } from "../Page.type";

export default function AudioRenderer({ data }: AudioRendererProps): ReactNode {
  const bytes: Uint8Array<ArrayBuffer> = new Uint8Array(data.buffer.data);
  const blob: Blob = new Blob([bytes.buffer], { type: data.mime_type });
  const url: string = URL.createObjectURL(blob);

  return <audio controls src={url}/>;
};
