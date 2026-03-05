import type { ReactNode } from "react";
import type { FormBodyProps } from "../Form.type";

import scss from "../scss/Form-Body.module.scss"

export default function FormBody({ children, error, onSubmit }: FormBodyProps): ReactNode {
  return(
    <form onSubmit={onSubmit} className={scss.form_body}>
      {children}
      {error && <p className={scss.form_body_error}>{error}</p>}
    </form>
  );
};
