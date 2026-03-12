import scss from "./Icon-Button.module.scss";

import type { ReactNode } from "react";
import type { ButtonProps } from "./Icon-Button.type";

export default function IconButton({ children, className, ...attributes }: ButtonProps): ReactNode {
  return(
    <button 
      {...attributes } 
      className={`${scss.button} ${className}`} 
      type="button">
        {children}
    </button>
  );
};
