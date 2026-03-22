import scss from "./Empty.module.scss";

import type { ReactNode } from "react";
import type { EmptyProps } from "./Empty.type";

export default function Empty({ header, main, footer }: EmptyProps): ReactNode {
  return(
    <div className={scss.container}>
      <div className={scss.body}>
        {header ? <h3 className={scss.header}>{header}</h3> : null}
        <p className={scss.main}>{main}</p>
        {footer ? <section className={scss.footer}>{footer}</section> : null}
      </div>
    </div>
  );
};
