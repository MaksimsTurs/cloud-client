import type { ReactNode } from "react";
import type { AlertContainerProps } from "../Alert.type";

import scss from "../scss/Alert-Container.module.scss";

import formatTitle from "../utils/format-title.util";

import { CircleAlertIcon } from "lucide-react";

export default function AlertContainer({ children, type, title }: AlertContainerProps): ReactNode {
  return(
    <div className={scss.alert_container}>
      <section className={scss.alert_header}>
        <CircleAlertIcon/>
        <p>{title || formatTitle(type)}</p>
      </section>
      <div className={scss.alert_body}>{children}</div>
    </div>
  )
};
