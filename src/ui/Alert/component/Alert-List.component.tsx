import type { ReactNode } from "react";
import type { AlertListProps } from "../Alert.type";

import scss from "../scss/Alert-List.module.scss";

import formatTitle from "../utils/format-title.util";

import { CircleAlertIcon } from "lucide-react";

export default function AlertList({ children, title, type }: AlertListProps): ReactNode {
  return(
    <div className={scss.alert_list_container}>
      <section className={scss.alert_list_header}>
        <CircleAlertIcon strokeWidth={2} size={20}/>
        <p>{title || formatTitle(type)}</p>
      </section>
      <ul className={scss.alert_list}>{children}</ul>  
    </div>
  )
};
