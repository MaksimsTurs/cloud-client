import type { PropsWithChildren } from "react";
import type { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form";

export type FormContainerProps = PropsWithChildren;

export type FormBodyProps<T extends FieldValues> = PropsWithChildren<{
  error?: string
  className?: string
  onSubmit: SubmitHandler<T>;
} & UseFormReturn<T>>;

export type FormHeaderProps = {
  title: string
};
