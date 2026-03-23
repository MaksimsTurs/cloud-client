import type { ReactNode } from "react";
import type { FileBinarySettingOptions, FileSettingFormProps } from "../File-Setting-Form.type";

import { useForm } from "react-hook-form";

import scss from "../File-Setting-Form.module.scss";

import { FormBody } from "@ui/Form/Form.component";
import InputText from "@ui/Input-Text/Input-Text.component";
import TextButton from "@ui/Text-Button/Text-Button.component";

export default function BinarySettings({ 
  onSubmit, 
  defaultValues 
}: FileSettingFormProps<FileBinarySettingOptions>): ReactNode {
  const methods = useForm<FileBinarySettingOptions>({ mode: "onSubmit", defaultValues });

  return(
    <FormBody
      {...methods }
      className={scss.file_options_container} 
      onSubmit={onSubmit}>
      <InputText<FileBinarySettingOptions>
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


