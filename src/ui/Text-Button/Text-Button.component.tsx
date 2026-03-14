import type { ReactNode } from "react";
import type { TextButtonProps } from "./Text-Button.type";

import scss from "./Text-Button.module.scss";

export default function TextButton({ text, ...attributes }: TextButtonProps): ReactNode {
  return <button {...attributes } className={scss.button}>{text}</button>;
};
