import type { ReactNode } from "react";
import type { FileSettingFormProps, FileTextSettingOptions } from "../File-Setting-Form.type";

import { useForm } from "react-hook-form";
import { FormBody } from "@ui/Form/Form.component";
import InputText from "@ui/Input-Text/Input-Text.component";
import TextButton from "@ui/Text-Button/Text-Button.component";

import scss from "../File-Setting-Form.module.scss";

export default function TextSettings({ 
  onSubmit, 
  defaultValues 
}: FileSettingFormProps<FileTextSettingOptions>): ReactNode {
  const methods = useForm<FileTextSettingOptions>({ mode: "onSubmit", defaultValues });

  return(
    <FormBody
      {...methods }
      className={scss.file_options_container} 
      onSubmit={onSubmit}>
      <InputText<FileTextSettingOptions>
        placeholder="Name (with extention)"
        type="text"
        name="name"
        autoComplete="off"
        options={{
            maxLength: { value: 64, message: "File name is to long!" }
        }}/>
      <TextButton text="Save config"/>
    </FormBody>
  );
};

