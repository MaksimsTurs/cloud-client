import type { ReactNode } from "react";
import type { SideMenuContainerProps } from "../Page.type";

import scss from "../scss/Side-Menu-Container.module.scss";

export default function SideMenuContainer({ children }: SideMenuContainerProps): ReactNode {
  return(
    <div className={scss.side_menu_container}>
      {children}
    </div>
  );
};
