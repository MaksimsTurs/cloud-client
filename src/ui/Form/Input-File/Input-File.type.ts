import type { 
  FieldValues, 
  Path, 
  UseFormRegister, 
  RegisterOptions 
} from "react-hook-form";

export type InputFileProps<P extends FieldValues> = {
  register: UseFormRegister<P>
  name: Path<P>
  options?: RegisterOptions<P, Path<P>>
  accept?: string[]
  error?: string
};
