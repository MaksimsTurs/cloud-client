import type { PropsWithChildren, ReactNode } from "react";

import scss from "../scss/Form-Footer.module.scss";

export default function FormFooter({ children }: PropsWithChildren): ReactNode {
  return <div className={scss.form_footer}>{children}</div>
};
