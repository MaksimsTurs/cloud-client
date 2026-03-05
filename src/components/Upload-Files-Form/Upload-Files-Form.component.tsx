import type { ReactNode } from "react";
import type { SubmitHandler } from "react-hook-form";
import type { UploadFiles } from "./Upload-Files-Form.type";

import { FormBody } from "@ui/Form/Form/Form.component";
import InputFile from "@ui/Form/Input-File/Input-File.component";
import SubmitButton from "@ui/Submit-Button/Submit-Button.component";

import { useModalsManager } from "@feature/modals-manager/modals-manager.feature";
import { useFileExplorer, useFileExplorerHistory } from "@feature/file-explorer/file-explorer.feature";
import { useForm } from "react-hook-form";

import validateFiles from "./utils/validate-files.util";

import scss from "./Upload-Files-Form.module.scss";

export default function UploadFilesForm(): ReactNode {
  const modalsManager = useModalsManager();
  const fe = useFileExplorer();
  const feHistory = useFileExplorerHistory();
  const { handleSubmit, register, setError, formState: { errors }} = useForm<UploadFiles>();

  const uploadFiles: SubmitHandler<UploadFiles> = async (upload): Promise<void> => {
    const errorMessage: string | undefined = validateFiles(upload.files);

    if(errorMessage) {
      setError("files", { message: errorMessage });
    } else {
      const isOk: boolean = await fe.upload(upload.files, feHistory.parent?.id);

      if(isOk) {
        modalsManager.pop();
      }
    }
  };

  return(
    <div className={scss.upload_files_container}>
      <FormBody onSubmit={handleSubmit(uploadFiles)}>
        <InputFile 
          name="files" 
          register={register} 
          error={errors.files?.message}/>
        <SubmitButton text="Upload" disabled={feHistory.isLoading}/>
      </FormBody>
    </div>
 );
};
