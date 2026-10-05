import type { JSX, ReactNode } from "react";
import type { FieldValues, Path, RegisterOptions } from "react-hook-form";

export type InputCheckboxProps<P extends FieldValues> = {
  name: Path<P>
  options?: RegisterOptions<P, Path<P>>
  label: ReactNode
} & Omit<JSX.IntrinsicElements["input"], "className" | "name">;
