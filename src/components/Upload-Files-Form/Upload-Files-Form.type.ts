import type { FileSettingOptions } from "../File-Setting-Form/File-Setting-Form.type";

export type UploadFiles = {
  files: FileList
} & Record<string, FileSettingOptions>;
