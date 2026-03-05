import type { ReactNode } from "react";
import type { SideMenuSectionProps } from "../Page.type";

import scss from "../scss/Side-Menu-Section.module.scss";

export default function SideMenuSection({ name, value }: SideMenuSectionProps): ReactNode {
  return(
    <section className={scss.side_menu_section}>
      <p>{name}:</p>
      <p>{value}</p>
    </section>
  );
};
