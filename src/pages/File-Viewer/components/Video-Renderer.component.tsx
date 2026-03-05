import type { ReactNode } from "react";
import type { VideoRendererProps } from "../Page.type";

export default function VideoRenderer({ data }: VideoRendererProps): ReactNode {
  return <video controls src={`${import.meta.env.VITE_BASE_FILE_PATH}/${data}`}/>;
};
