import type { ReactNode } from "react";
import type { FormHeaderProps } from "../Form.type";

import scss from "../scss/Form-Header.module.scss";

export default function FormHeader({ title }: FormHeaderProps): ReactNode {
  return <p className={scss.form_header}>{title}</p>;
};
