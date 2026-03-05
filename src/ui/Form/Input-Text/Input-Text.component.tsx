import type { ReactNode } from "react";
import type { InputTextProps } from "./Input-Text.type";
import type { FieldValues } from "react-hook-form";

import { useState } from "react";

import scss from "./Input-Text.module.scss";

import { EyeClosedIcon, EyeIcon } from "lucide-react";

export default function InputText<P extends FieldValues>({ error, register, options, type, ...attributes }: InputTextProps<P>): ReactNode {
  const [isPreviewMode, setPreviewMode] = useState<boolean>(false);

  const togglePreview = (): void => {
    setPreviewMode(prev => !prev);
  };

  return(
    <label className={scss.input_text_label} htmlFor={attributes.name}>
      <div className={scss.input_text_container}>
      {type === "password" ?
        <button
          className={scss.input_text_preview_button} 
          onClick={togglePreview} 
          type="button">
          {isPreviewMode ? <EyeIcon strokeWidth={1} size={20}/> : <EyeClosedIcon size={20} strokeWidth={1}/>}
        </button> : null}
        <input 
          {...attributes } 
          {...register(attributes.name, options) }
          type={isPreviewMode ? "text" : type}
          id={attributes.name}
          className={error ? scss.input_text_error : scss.input_text}/>
      </div>
      {error ? <p className={scss.input_text_error_message}>{error}</p> : null}
    </label>
  );
};
