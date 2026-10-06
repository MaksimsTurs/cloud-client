import scss from "./Hybride-Button.module.scss";

import type { ReactNode } from "react";
import type { HybrideButtonProps } from "./Hybride-Button.type";

export default function HybrideButton({
  className,
  icon,
  text,
  ...attributes 
}: HybrideButtonProps): ReactNode {
  const fullClassName: string = `${className} ${scss.hybride_button} ${(icon && text) ? scss.hybride_button__full : ""}`;
  
  return(
    <button 
      {...attributes } 
      className={fullClassName} 
      type="button">
      {icon}
      {text}
    </button>
  );
};
