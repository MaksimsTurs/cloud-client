import type { ReactNode } from "react";
import type { FormBodyProps } from "../Form.type";

import scss from "../scss/Form-Body.module.scss";

import { FormProvider } from "react-hook-form";

export default function FormBody({ children, error, className, onSubmit, ...providerProps }: FormBodyProps): ReactNode {
  return(
    <FormProvider {...providerProps }>
      <form
        noValidate
        onSubmit={providerProps.handleSubmit(onSubmit)} 
        className={`${scss.form_body} ${className}`}>
        {children}
        {error && <p className={scss.form_body_error}>{error}</p>}
      </form>
    </FormProvider>
 );
};
