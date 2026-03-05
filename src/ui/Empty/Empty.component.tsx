import scss from "./Empty.module.scss";

import type { ReactNode } from "react";
import type { EmptyProps } from "./Empty.type";

export default function Empty({ children }: EmptyProps): ReactNode {
  return <div className={scss.empty_container}>{children}</div>;
};
