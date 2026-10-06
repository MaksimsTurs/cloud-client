import type { ReactNode } from "react";
import type { FileBinarySettingOptions, FileSettingFormProps } from "../File-Setting-Form.type";

import { useForm } from "react-hook-form";

import scss from "../File-Setting-Form.module.scss";

import { FormBody } from "@ui/Form/Form.component";
import InputText from "@ui/Input-Text/Input-Text.component";
import TextButton from "@ui/Text-Button/Text-Button.component";

import VALIDATION_RULES from "@root/const/VALIDATION_RULES.const";

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
        placeholder="Name"
        type="text"
        name="name"
        autoComplete="off"
        options={VALIDATION_RULES.STORAGE_OBJECT.NAME()}/>
      <TextButton text="Save"/>
    </FormBody>
  );
};


