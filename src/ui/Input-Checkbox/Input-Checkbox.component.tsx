import type { ReactNode } from "react";
import type { FieldValues } from "react-hook-form";
import type { InputCheckboxProps } from "./Input-Checkbox.type";

import scss from "./Input-Checkbox.module.scss";

import { useFormContext } from "react-hook-form";

import InputErrorMessage from "../Input-Error-Message/Input-Error-Message.component";

export default function InputCheckbox<T extends FieldValues>({ options, label, ...attributes }: InputCheckboxProps<T>): ReactNode {
  const { register, formState: { errors }} = useFormContext<T>();
  
  const error: string | undefined = errors[attributes.name]?.message?.toString();
  const containerClassName: string = `${scss.input_checkbox_container} ${error ? scss.input_checkbox_container__error : ""}`;

  return(
    <label className={scss.input_checkbox_label}>
      <div className={containerClassName}>
        <input 
          {...attributes } 
          {...register(attributes.name, options)} 
          type="checkbox"/>
        <div className={scss.input_checkbox}></div>
        {label}
      </div>
      {error && <InputErrorMessage message={error}/>}
    </label>
  );
};
