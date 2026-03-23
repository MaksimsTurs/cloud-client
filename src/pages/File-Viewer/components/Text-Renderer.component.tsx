import type { ReactNode } from "react";
import type { TextRendererProps } from "../Page.type";

import scss from "../scss/Text-Renderer.module.scss";

export default function TextRenderer({ data }: TextRendererProps): ReactNode {
  const textEncoder: TextDecoder = new TextDecoder();
  const buffer: Uint8Array<ArrayBuffer> = new Uint8Array(data.buffer.data);

  return <pre className={scss.text_renderer}>{textEncoder.decode(buffer)}</pre>;
};
