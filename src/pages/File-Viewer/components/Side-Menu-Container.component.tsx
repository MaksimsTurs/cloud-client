import type { ReactNode } from "react";
import type { SideMenuContainerProps } from "../Page.type";

import scss from "../scss/Side-Menu-Container.module.scss";

export default function SideMenuContainer({ children }: SideMenuContainerProps): ReactNode {
  return(
    <aside className={scss.side_menu_container}>
      <h3>Summary</h3>
      {children}
    </aside>
  );
};
