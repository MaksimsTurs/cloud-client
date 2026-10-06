import type { FileImageSettingOptions, FileSettingFormProps } from "../File-Setting-Form.type";
import type { ReactNode } from "react";

import InputText from "@ui/Input-Text/Input-Text.component";
import TextButton from "@ui/Text-Button/Text-Button.component";
import { FormBody } from "@ui/Form/Form.component";
import { InputSelect, InputSelectOption } from "@ui/Input-Select/Input-Select.component";

import { useForm } from "react-hook-form";

import scss from "../File-Setting-Form.module.scss";

import VALIDATION_RULES from "@root/const/VALIDATION_RULES.const";

export default function ImageSettings({ 
  onSubmit, 
  defaultValues 
}: FileSettingFormProps<FileImageSettingOptions>): ReactNode {
  const methods = useForm<FileImageSettingOptions>({ mode: "onSubmit", defaultValues });

  return(
    <FormBody 
      {...methods }
      className={scss.file_options_container} 
      onSubmit={onSubmit}>
      <InputText<FileImageSettingOptions>
        placeholder="Name"
        type="text"
        name="name"
        autoComplete="off"
        options={VALIDATION_RULES.STORAGE_OBJECT.NAME()}/>
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
        options={VALIDATION_RULES.STORAGE_OBJECT.QUALITY()}/>
      <section className={scss.file_options_section}>
        <InputText<FileImageSettingOptions>
          placeholder="Width"
          type="number"
          name="width"
          min={0}
          step={1}
          options={VALIDATION_RULES.STORAGE_OBJECT.SIZE()}/>
        <InputText<FileImageSettingOptions>
          placeholder="Height"
          type="number"
          name="height"
          min={0}
          step={1}
          options={VALIDATION_RULES.STORAGE_OBJECT.SIZE()}/>
      </section>
      <TextButton text="Save"/>
    </FormBody>
  );
};
