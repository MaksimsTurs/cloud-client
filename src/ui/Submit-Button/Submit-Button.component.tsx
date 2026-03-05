import type { ReactNode } from "react";
import type { SubmitButtonProps } from "./Submit-Button.type";

import scss from "./Submit-Button.module.scss";

export default function SubmitButton({ text, ...attributes }: SubmitButtonProps): ReactNode {
  return(
    <button 
      {...attributes } 
      className={scss.submit_button} 
      type="submit">
      {text}
    </button>
  );
};
