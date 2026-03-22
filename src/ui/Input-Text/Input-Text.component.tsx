import type { ReactNode } from "react";
import type { InputTextProps } from "./Input-Text.type";
import type { FieldValues } from "react-hook-form";

import { useState } from "react";
import { useFormContext } from "react-hook-form";

import scss from "./Input-Text.module.scss";

import { EyeClosedIcon, EyeIcon } from "lucide-react";

export default function InputText<T extends FieldValues>({ options, type, ...attributes }: InputTextProps<T>): ReactNode {
  const [isPreviewMode, setPreviewMode] = useState<boolean>(false);
  const { register, formState: { errors }} = useFormContext<T>();

  const error = errors[attributes.name]?.message;

  const togglePreview = (): void => {
    setPreviewMode(prev => !prev);
  };

  const setValueAs = (value: string): string | number => {
    if(type === "number") {
      const maybeValidNumber: unknown = parseFloat(value);

      if(Number.isNaN(maybeValidNumber)) {
        return "";
      }

      return maybeValidNumber as number;
    }

    return value;
  };

  return(
    <label className={scss.input_text_label} htmlFor={attributes.name}>
      <div className={scss.input_text_container}>
      {type === "password" ?
        <button
          className={scss.input_text_preview_button} 
          onClick={togglePreview} 
          type="button">
          {isPreviewMode ? <EyeIcon strokeWidth={1} size={24}/> : <EyeClosedIcon strokeWidth={1} size={24}/>}
        </button> : null}
        <input 
          {...attributes } 
          {...register(attributes.name, {
            ...options,
            setValueAs
          }) }
          type={isPreviewMode ? "text" : type}
          id={attributes.name}
          className={error ? scss.input_text_error : scss.input_text}/>
      </div>
      {error ? <p className={scss.input_text_error_message}>{error.toString()}</p> : null}
    </label>
  );
};
