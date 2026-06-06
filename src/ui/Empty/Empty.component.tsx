import scss from "./Empty.module.scss";

import type { ReactNode } from "react";
import type { EmptyProps } from "./Empty.type";

export default function Empty({ header, main, footer }: EmptyProps): ReactNode {
  return(
    <div className={scss.empty_container}>
      <div className={scss.empty_body}>
        {header ? <h3 className={scss.empty_header}>{header}</h3> : null}
        <p className={scss.empty_main}>{main}</p>
        {footer ? <section className={scss.empty_footer}>{footer}</section> : null}
      </div>
    </div>
  );
};
