import type { Dispatch, JSX, PropsWithChildren, ReactNode, SetStateAction } from "react";
import type { FieldValues, Path, UseFormSetValue } from "react-hook-form";

export type InputSelectContextValue<T extends FieldValues> = {
  selectedValue?: InputSelectValue
  selectedChildren?: ReactNode
  defaultValue?: InputSelectValue
  name: Path<T>

  setSelectValue: Dispatch<SetStateAction<InputSelectValue | undefined>>
  setSelectChildren: Dispatch<SetStateAction<ReactNode>>
  setFormValue: UseFormSetValue<T> 
};

export type InputSelectProps<T extends FieldValues> = PropsWithChildren<{
  name: Path<T>
  placeholder?: ReactNode
  error?: string
  defaultValue?: InputSelectValue
}>;

export type InputSelectOptionProps = PropsWithChildren<{
  value: InputSelectValue
  selected?: boolean
  disabled?: boolean
} & JSX.IntrinsicElements["li"]>;

export type InputSelectValue = string | number;
