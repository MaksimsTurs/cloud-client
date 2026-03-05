import type { ReactNode } from "react";
import type { AudioRendererProps } from "../Page.type";

export default function AudioRenderer({ data }: AudioRendererProps): ReactNode {
  return <audio controls src={`${import.meta.env.VITE_BASE_FILE_PATH}/${data}`}/>;
};
