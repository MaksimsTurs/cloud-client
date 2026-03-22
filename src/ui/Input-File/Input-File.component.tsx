import type { ReactNode, RefObject, SyntheticEvent } from "react";
import type { FieldValues, Path, PathValue, SubmitHandler } from "react-hook-form";
import type { InputFileProps } from "./Input-File.type";
import type { FileSettingOptions } from "@component/File-Setting-Form/File-Setting-Form.type";

import scss from "./Input-File.module.scss";

import { CircleXIcon, DownloadIcon, SettingsIcon } from "lucide-react";
import { Fragment, Activity, useState, useRef } from "react";

import { useFormContext } from "react-hook-form";

import { useModalsManager } from "@feature/modals-manager/modals-manager.feature";

import InputErrorMessage from "../Input-Error-Message/Input-Error-Message.component";
import FileSettingForm from "@component/File-Setting-Form/File-Setting-Form.component";

export default function InputFile<T extends FieldValues>({ name, accept, error, options }: InputFileProps<T>): ReactNode {
  const { register, setValue, getValues } = useFormContext<T>();
  const modalsManager = useModalsManager();
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
  const dataTransferRef: RefObject<DataTransfer> = useRef<DataTransfer>(new DataTransfer());
  const currentFile: RefObject<number> = useRef<number>(0);

  const fileListMode = filesToUpload.length ? "visible" : "hidden";
  const fileInputMode = !filesToUpload.length ? "visible" : "hidden";

  const upload = (event: SyntheticEvent<HTMLInputElement>): void => {
    const { files } = event.currentTarget;

    if(files) {
      setFilesToUpload(Array.from({ length: files.length }).map((_, index) => files.item(index)!));
    }
  };

  const saveFileOptions: SubmitHandler<FileSettingOptions> = (options: FileSettingOptions): void => {
    const name = currentFile.current.toString() as Path<T>;
    const value = options as PathValue<T, Path<T>>;

    setValue(name, value);
    modalsManager.pop();
  };

  const removeFile = (index: number, file: File): void => {
    dataTransferRef.current.items.clear();

    setFilesToUpload(prev => {
      const filtered: File[] = prev.filter(item => {
        if(item.name === file.name) {
          return false;
        }

        dataTransferRef.current.items.add(item);
        return true;
      });

      const configFileName = index.toString() as Path<T>;
      const files = dataTransferRef.current.files as PathValue<T, Path<T>>;

      setValue(name, files);
      setValue(configFileName, undefined as PathValue<T, Path<T>>);

      return filtered;
    });
  };

  const openFileSettingModal = (index: number, file: File): void => {
    const name = index.toString() as Path<T>;

    currentFile.current = index;
    modalsManager.push(
      `File Settings(${file.name})`, 
      <FileSettingForm mimeType={file.type} onSubmit={saveFileOptions} defaultValues={getValues(name)}/>
    );
  };

  return(
    <Fragment>
      <Activity mode={fileListMode}>
        <ul className={`${scss.input_file_list} ${error ? scss.input_file_list_error : ""}`}>
          {filesToUpload.map((file, index) => (
            <li className={scss.input_file_item} key={file.name}>
              <p className={scss.input_file_name}>{file.name}</p>
              <div className={scss.input_file_actions}>
                <button
                  type="button"
                  onClick={() => openFileSettingModal(index, file)}>
                  <SettingsIcon strokeWidth={1.2}/>
                </button>
                <button 
                  type="button" 
                  onClick={() => removeFile(index, file)}>
                  <CircleXIcon strokeWidth={1.2}/>
                </button>
              </div>
            </li>
          ))}
        </ul>
        {error ? <InputErrorMessage message={error}/> : null} 
      </Activity>
      <Activity mode={fileInputMode}>
        <label className={`${error ? scss.input_file_label_error : ""} ${scss.input_file_label}`} htmlFor={name}>
          <DownloadIcon/>
          <input
            {...register(name, options)}
            id={name}
            accept={accept?.join(",") || ""} 
            multiple 
            type="file" 
            onInput={upload}/>
        </label>
        {error ? <InputErrorMessage message={error}/> : null} 
      </Activity>
   </Fragment>
  )
};
