import scss from "./Button.module.scss";

import type { ReactNode } from "react";
import type { ButtonProps } from "./Button.type";

export default function Button({ children, className, ...attributes }: ButtonProps): ReactNode {
  return(
    <button 
      {...attributes } 
      className={`${scss.button} ${className}`} 
      type="button">
        {children}
    </button>
  );
};
