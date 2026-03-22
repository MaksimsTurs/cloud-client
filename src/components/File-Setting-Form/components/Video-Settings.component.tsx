import type { ReactNode } from "react";
import type { FileSettingFormProps, FileVideoSettingOptions } from "../File-Setting-Form.type";

import { useForm } from "react-hook-form";

import { FormBody } from "@ui/Form/Form.component";
import { InputSelect, InputSelectOption } from "@ui/Input-Select/Input-Select.component";
import InputText from "@ui/Input-Text/Input-Text.component";
import TextButton from "@ui/Text-Button/Text-Button.component";

import scss from "../File-Setting-Form.module.scss";

export default function VideoSettings({ 
  onSubmit, 
  defaultValues 
}: FileSettingFormProps<FileVideoSettingOptions>): ReactNode {
  const methods = useForm<FileVideoSettingOptions>({ mode: "onSubmit", defaultValues });
  const { formState: { errors }} = methods;

  return(
    <FormBody
      {...methods }
      className={scss.file_options_container} 
      onSubmit={onSubmit}>
      <InputText<FileVideoSettingOptions>
        placeholder="Name (with extention)"
        type="text"
        name="name"
        autoComplete="off"
        error={errors.name?.message}
        options={{
            maxLength: { value: 64, message: "File name is to long!" }
        }}/>
      <InputText<FileVideoSettingOptions>
        placeholder="CRF(Constant Rate Factor)"
        type="number"
        name="crf"
        autoComplete="off"
        error={errors.name?.message}
        max={51}
        options={{
            max: { value: 51, message: "CRF is to big!" }
        }}/>
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
      <TextButton text="Save config"/>
    </FormBody>
  );
};

