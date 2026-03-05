import type { JSX } from "react";

export type SubmitButtonProps = {
  text: string
} & Omit<JSX.IntrinsicElements["button"], "type">;
