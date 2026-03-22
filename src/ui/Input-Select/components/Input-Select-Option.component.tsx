import type { Context, ReactNode, RefObject } from "react";
import type { InputSelectValue, InputSelectProps, InputSelectContextValue } from "../Input-Select.type";
import type { FieldValues } from "react-hook-form";

import { useState, createContext, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";

import scss from "../scss/Input-Select.module.scss";

import InputErrorMessage from "@ui/Input-Error-Message/Input-Error-Message.component";

export const InputSelectContext: Context<InputSelectContextValue<any> | undefined> = createContext<InputSelectContextValue<any> | undefined>(undefined);

export default function InputSelect<T extends FieldValues>({ 
  children,
  placeholder, 
  name, 
  error,
  defaultValue
}: InputSelectProps<T>): ReactNode {
  const [selectedChildren, setSelectChildren] = useState<ReactNode | undefined>(undefined);
  const [selectedValue, setSelectValue] = useState<InputSelectValue | undefined>(undefined);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const childrenRef: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null);
  const { setValue } = useFormContext<T>();

  const value: InputSelectContextValue<T> = {
    name,
    selectedValue,
    selectedChildren,
    defaultValue,
    setSelectChildren,
    setSelectValue,
    setFormValue: setValue
  };

  const toggleDropdownState = (event: Event): void => {
    const target: HTMLElement = event.target as HTMLElement;
    setIsDropdownOpen(prev => {
      if(target === childrenRef.current || childrenRef.current!.contains(target)) {
        return !prev;
      }

      return false;
    });
  };

  useEffect(() => {
    document.addEventListener("click", toggleDropdownState);

    return () => {
      document.removeEventListener("click", toggleDropdownState);
    };
  }, []);

  return(
    <InputSelectContext value={value}>
      <div className={scss.input_select_container}>
        <div
          ref={childrenRef}
          className={`
            ${scss.input_select} 
            ${isDropdownOpen ? scss.input_select_active : ""} 
            ${error ? scss.input_select_error : ""}
          `}>
          {selectedChildren ? <section>{selectedChildren}</section> : <p className={scss.input_select_placeholder}>{placeholder}</p>}
          <ul className={scss.input_select_dropdown}>{children}</ul>
        </div>
        {error ? <InputErrorMessage message="Some error is occured!"/> : null}
      </div>
    </InputSelectContext>
  );
};


