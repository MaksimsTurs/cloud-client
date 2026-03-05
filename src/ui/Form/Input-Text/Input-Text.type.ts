import type { HTMLInputTypeAttribute, JSX } from "react";
import type { FieldValues, Path, RegisterOptions, UseFormRegister } from "react-hook-form";

export type InputTextProps<P extends FieldValues> = {
  error?:   string
  name:     Path<P>
  register: UseFormRegister<P>
  options?: RegisterOptions<P, Path<P>>
  type:     InputTextTypes 
} & Omit<JSX.IntrinsicElements["input"], "className" | "name">;

type InputTextTypes = Extract<HTMLInputTypeAttribute, "number" | "text" | "password" | "email">
