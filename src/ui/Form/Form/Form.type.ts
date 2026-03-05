import type { JSX, PropsWithChildren } from "react";

export type FormContainerProps = PropsWithChildren;

export type FormBodyProps = PropsWithChildren<{
  error?: string
  onSubmit: JSX.IntrinsicElements["form"]["onSubmit"];
}>;

export type FormHeaderProps = {
  title: string
};
