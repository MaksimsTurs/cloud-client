import type { ReactNode } from "react";
import type { TextRendererProps } from "../Page.type";

import scss from "../scss/Text-Renderer.module.scss";

export default function TextRenderer({ data }: TextRendererProps): ReactNode {
  return <pre className={scss.text_renderer}>{data}</pre>;
};
