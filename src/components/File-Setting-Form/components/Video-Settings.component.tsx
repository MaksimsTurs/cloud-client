import type { ReactNode } from "react";
import type { FileSettingFormProps, FileVideoSettingOptions } from "../File-Setting-Form.type";

import { useForm } from "react-hook-form";

import { FormBody } from "@ui/Form/Form.component";
import { InputSelect, InputSelectOption } from "@ui/Input-Select/Input-Select.component";
import InputText from "@ui/Input-Text/Input-Text.component";
import TextButton from "@ui/Text-Button/Text-Button.component";

import scss from "../File-Setting-Form.module.scss";

import VALIDATION_RULES from "@root/const/VALIDATION_RULES.const";

export default function VideoSettings({ 
  onSubmit, 
  defaultValues 
}: FileSettingFormProps<FileVideoSettingOptions>): ReactNode {
  const methods = useForm<FileVideoSettingOptions>({ mode: "onSubmit", defaultValues });

  return(
    <FormBody
      {...methods }
      className={scss.file_options_container} 
      onSubmit={onSubmit}>
      <InputText<FileVideoSettingOptions>
        placeholder="Name"
        type="text"
        name="name"
        autoComplete="off"
        options={VALIDATION_RULES.STORAGE_OBJECT.NAME()}/>
      <InputText<FileVideoSettingOptions>
        placeholder="CRF(Constant Rate Factor)"
        type="number"
        name="crf"
        autoComplete="off"
        max={51}
        options={VALIDATION_RULES.STORAGE_OBJECT.CRF()}/>
        <InputSelect name="preset" placeholder="Preset" defaultValue={defaultValues?.preset}>
          <InputSelectOption value="ultrafast">Ultrafast</InputSelectOption>
          <InputSelectOption value="superfast">Superfast</InputSelectOption>
          <InputSelectOption value="veryfast">Veryfast</InputSelectOption>
          <InputSelectOption value="faster">Faster</InputSelectOption>
          <InputSelectOption value="fast">Fast</InputSelectOption>
          <InputSelectOption value="medium">Medium</InputSelectOption>
          <InputSelectOption value="slow">Slow</InputSelectOption>
          <InputSelectOption value="slower">Slower</InputSelectOption>
          <InputSelectOption value="veryslow">Veryslow</InputSelectOption>
        </InputSelect>
        <InputSelect name="vcodec" placeholder="Video decoder" defaultValue={defaultValues?.vcodec}>
          <InputSelectOption value="libx264">H.264</InputSelectOption>
          <InputSelectOption value="libx265">H.265</InputSelectOption>
        </InputSelect>
      <TextButton text="Save"/>
    </FormBody>
  );
};

