import type { ReactNode } from "react";
import type { FileAudioSettingOptions, FileSettingFormProps } from "../File-Setting-Form.type";

import { useForm } from "react-hook-form";

import { FormBody } from "@ui/Form/Form.component";
import InputText from "@ui/Input-Text/Input-Text.component";
import TextButton from "@ui/Text-Button/Text-Button.component";

import scss from "../File-Setting-Form.module.scss";

export default function AudioSettings({ 
  onSubmit, 
  defaultValues 
}: FileSettingFormProps<FileAudioSettingOptions>): ReactNode {
  const methods = useForm<FileAudioSettingOptions>({ mode: "onSubmit", defaultValues });
  const { formState: { errors }} = methods;

  return(
    <FormBody 
      {...methods }
      className={scss.file_options_container} 
      onSubmit={onSubmit}>
      <InputText<FileAudioSettingOptions>
        placeholder="Name (with extention)"
        type="text"
        name="name"
        autoComplete="off"
        error={errors.name?.message}
        options={{
            maxLength: { value: 64, message: "File name is to long!" }
        }}/>
      <TextButton text="Save config"/>
    </FormBody>
  );
};

