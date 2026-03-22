import type { HTMLInputTypeAttribute, JSX } from "react";
import type { FieldValues, Path, RegisterOptions } from "react-hook-form";

export type InputTextProps<P extends FieldValues> = {
  name: Path<P>
  options?: RegisterOptions<P, Path<P>>
  type: InputTextTypes 
} & Omit<JSX.IntrinsicElements["input"], "className" | "name">;

type InputTextTypes = Extract<HTMLInputTypeAttribute, "number" | "text" | "password" | "email">
