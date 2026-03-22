import type { FileImageSettingOptions, FileSettingFormProps } from "../File-Setting-Form.type";
import type { ReactNode } from "react";

import InputText from "@ui/Input-Text/Input-Text.component";
import TextButton from "@ui/Text-Button/Text-Button.component";
import { FormBody } from "@ui/Form/Form.component";
import { InputSelect, InputSelectOption } from "@ui/Input-Select/Input-Select.component";

import { useForm } from "react-hook-form";

import scss from "../File-Setting-Form.module.scss";

export default function ImageSettings({ 
  onSubmit, 
  defaultValues 
}: FileSettingFormProps<FileImageSettingOptions>): ReactNode {
  const methods = useForm<FileImageSettingOptions>({ mode: "onSubmit", defaultValues });
  const { formState: { errors }} = methods;

  return(
    <FormBody 
      {...methods }
      className={scss.file_options_container} 
      onSubmit={onSubmit}>
      <InputText<FileImageSettingOptions>
        placeholder="Name (with extention)"
        type="text"
        name="name"
        autoComplete="off"
        error={errors.name?.message}
        options={{
            maxLength: { value: 64, message: "File name is to long!" }
        }}/>
      <InputSelect<FileImageSettingOptions>
        name="convertTo" 
        placeholder="Convert to"
        defaultValue={defaultValues?.convertTo}>
        <InputSelectOption value="png">PNG</InputSelectOption>
        <InputSelectOption value="webp">WEBP</InputSelectOption>
        <InputSelectOption value="jpg">JPG</InputSelectOption>
        <InputSelectOption value="jpeg">JPEG</InputSelectOption>
      </InputSelect>
      <InputText<FileImageSettingOptions>
        placeholder="Quality"
        type="number"
        name="quality"
        min={0}
        max={100}
        step={1}
        error={errors.quality?.message}
        options={{
          max: { value: 100, message: "Quality must be number between 0 and 100!" },
          min: { value: 0, message: "Quality must be number between 0 and 100!" }
        }}/>
      <section className={scss.file_options_section}>
        <InputText<FileImageSettingOptions>
          placeholder="Width"
          type="number"
          name="width"
          min={0}
          step={1}
          error={errors.width?.message}
          options={{
            min: { value: 0, message: "Width can not be less than 0!" }
          }}/>
        <InputText<FileImageSettingOptions>
          placeholder="Height"
          type="number"
          name="height"
          min={0}
          step={1}
          error={errors.height?.message}
          options={{
            min: { value: 0, message: "Height can not be less than 0!" }
          }}/>
      </section>
      <TextButton text="Save config"/>
    </FormBody>
  );
};
