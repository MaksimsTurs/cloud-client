import type { ReactNode } from "react";
import type { FormContainerProps } from "../Form.type.ts"

import scss from "../scss/Form-Container.module.scss"

export default function FormContainer({ children }: FormContainerProps): ReactNode {
  return <div className={scss.form_container}>{children}</div>
};
