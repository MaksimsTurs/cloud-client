import type { ReactNode } from "react";

export type RequestSomeEmailFromServerProps = {
  url: string
  metadata: ReactNode
  formHeader: string
};

export type RequestSomeEmailFromServer = {
  pseudonym: string
  email: string
};

export type SomeInputsProps = {
  url: string
};
