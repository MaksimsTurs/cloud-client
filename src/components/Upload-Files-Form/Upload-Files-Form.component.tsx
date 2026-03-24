import type { ReactNode } from "react";
import type { SubmitHandler } from "react-hook-form";
import type { UploadFiles } from "./Upload-Files-Form.type";

import { FormBody } from "@ui/Form/Form.component";
import InputFile from "@ui/Input-File/Input-File.component";
import TextButton from "@ui/Text-Button/Text-Button.component";

import { useModalsManager } from "@feature/modals-manager/modals-manager.feature";
import { useFileExplorer, useFileExplorerHistory } from "@feature/file-explorer/file-explorer.feature";
import { useForm } from "react-hook-form";

import validateFiles from "./utils/validate-files.util";

import scss from "./Upload-Files-Form.module.scss";

export default function UploadFilesForm(): ReactNode {
  const modalsManager = useModalsManager();
  const fe = useFileExplorer();
  const feHistory = useFileExplorerHistory();
  const methods = useForm<UploadFiles>();

  const { formState: { errors, isSubmitting }} = methods;

  const uploadFiles: SubmitHandler<UploadFiles> = async (upload): Promise<void> => {
    const isOk: boolean = await fe.upload(upload, feHistory.parent?.id);

    if(isOk) {
      modalsManager.pop();
    }
  };

  return(
    <div className={scss.upload_files_container}>
      <FormBody {...methods } onSubmit={uploadFiles}>
        <InputFile 
          name="files" 
          error={errors.files?.message}
          accept={["image/*", "video/*", "audio/*", "text/*", "application/json"]}
          options={{
            validate: validateFiles,
          }}/>
        <TextButton text="Upload" disabled={isSubmitting}/>
      </FormBody>
    </div>
 );
};
