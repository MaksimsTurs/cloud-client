import type { SubmitHandler } from "react-hook-form";

export type FileSettingFormProps<D> = {
  mimeType: string
  defaultValues?: D
  onSubmit: SubmitHandler<FileSettingOptions>
};

export type FileSettingOptions = 
  | FileImageSettingOptions
  | FileTextSettingOptions
  | FileVideoSettingOptions
  | FileBinarySettingOptions
  | FileAudioSettingOptions;

export type FileTextSettingOptions = {
  name: string
};

export type FileAudioSettingOptions = {
  name: string
};

export type FileBinarySettingOptions = {
  name: string
};

export type FileVideoSettingOptions = {
  name: string
  crf: number
  preset: string
  vcodec: string
};

export type FileImageSettingOptions = {
  name: string
  convertTo: FileImageConvertToOptions
  quality: number
  width: number
  height: number
};

export type FileImageConvertToOptions = "png" | "webp" | "jpg" | "jpeg";
