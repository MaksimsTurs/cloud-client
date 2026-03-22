import type { 
  FieldValues, 
  Path, 
  RegisterOptions 
} from "react-hook-form";

export type InputFileProps<P extends FieldValues> = {
  name: Path<P>
  options?: RegisterOptions<P, Path<P>>
  accept?: string[]
  error?: string
};
