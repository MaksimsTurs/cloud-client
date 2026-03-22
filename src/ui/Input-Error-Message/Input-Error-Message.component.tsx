import type { ReactNode } from "react";
import type { InputErrorMessageProps } from "./Input-Error-Message.type";

import scss from "./Input-Error-Message.module.scss";

import { CircleXIcon } from "lucide-react";

export default function InputErrorMessage({ message }: InputErrorMessageProps): ReactNode {
  return(
    <section className={scss.input_error_message}>
      <CircleXIcon strokeWidth={2} size={16}/>
      <p>{message}</p>
    </section>
  );
};
