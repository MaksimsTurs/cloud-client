import type { ReactNode } from "react";
import type { 
  InputSelectOptionProps, 
  InputSelectContextValue 
} from "../Input-Select.type";
import type { FieldValues } from "react-hook-form";

import { useContext, useEffect } from "react";

import { isUndefined } from "@util/is.util";

import { InputSelectContext } from "./Input-Select-Option.component";

export default function InputSelectOption<T extends FieldValues>({ value, children, disabled, ...attributes }: InputSelectOptionProps): ReactNode {
  const context: InputSelectContextValue<T> | undefined = useContext<InputSelectContextValue<T> | undefined>(InputSelectContext);

  if(isUndefined(context)) {
    throw new TypeError("Wrap this select option into InputSelect compontent!");
  };

  const setValue = (children: ReactNode, value: any): void => {
    context.setSelectChildren(children);
    context.setSelectValue(value);
    context.setFormValue(context.name, value);
  };

  const selectOption = (): void => {
    if(context.selectedValue === value) {
      setValue(undefined, undefined);
    } else {
      setValue(children, value);
    }
  };

  useEffect(() => {
    if(value === context.defaultValue) {
      context.setSelectChildren(children);
      context.setSelectValue(value);
    }
  }, []);

  return <li onClick={selectOption} {...attributes }>{children}</li>;
};
