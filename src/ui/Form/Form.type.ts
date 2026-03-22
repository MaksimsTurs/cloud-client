import type { PropsWithChildren } from "react";
import type { SubmitHandler, UseFormReturn } from "react-hook-form";

export type FormContainerProps = PropsWithChildren;

export type FormBodyProps = PropsWithChildren<{
  error?: string
  className?: string
  onSubmit: SubmitHandler<any>;
} & UseFormReturn<any>>;

export type FormHeaderProps = {
  title: string
};
