import type { ReactNode } from "react";
import type { AlertListItemProps } from "../Alert.type";

import scss from "../scss/Alert-Container.module.scss";

export default function AlertListItem({ text }: AlertListItemProps): ReactNode {
  return(
    <li className={scss.alert_container}>{text}</li>
  );
};
