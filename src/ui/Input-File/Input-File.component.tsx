import type { ReactNode, RefObject, SyntheticEvent } from "react";
import type { FieldValues, Path, PathValue, SubmitHandler } from "react-hook-form";
import type { InputFileProps } from "./Input-File.type";
import type { FileSettingOptions } from "@component/File-Setting-Form/File-Setting-Form.type";

import scss from "./Input-File.module.scss";

import { CircleXIcon, DownloadIcon, SettingsIcon } from "lucide-react";
import { Fragment, useState, useRef } from "react";

import { useFormContext } from "react-hook-form";

import { useModalsManager } from "@feature/modals-manager/modals-manager.feature";

import InputErrorMessage from "../Input-Error-Message/Input-Error-Message.component";
import FileSettingForm from "@component/File-Setting-Form/File-Setting-Form.component";

import getPreviewTag from "./utils/get-preview-tag.util";

import { MAX_FILES_TO_UPLOAD_COUNT } from "@root/const/NUMBER.const";
import clamp from "@root/utils/clamp.util";

export default function InputFile<T extends FieldValues>({ name, accept, options }: InputFileProps<T>): ReactNode {
  const { register, setValue, getValues, formState: { errors }} = useFormContext<T>();
  const modalsManager = useModalsManager();
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
  const dataTransferRef: RefObject<DataTransfer> = useRef<DataTransfer>(new DataTransfer());
  const currentFile: RefObject<number> = useRef<number>(0);

  const error: string | undefined = errors[name]?.message?.toString();

  const upload = (event: SyntheticEvent<HTMLInputElement>): void => {
    const { files } = event.currentTarget;

    if(files && filesToUpload.length < MAX_FILES_TO_UPLOAD_COUNT) {
      setFilesToUpload((prev: File[]): File[] => {
        const newArr: File[] = [
          ...prev, 
          ...Array
            .from<unknown>({ length: files.length }) 
            .map((_, index) => files.item(index)!)
        ].slice(0, MAX_FILES_TO_UPLOAD_COUNT);
        return newArr;
      });
    }
  };

  const saveFileOptions: SubmitHandler<FileSettingOptions> = (options: FileSettingOptions): void => {
    const name = currentFile.current.toString() as Path<T>;
    const value = options as PathValue<T, Path<T>>;

    setValue(name, value);
    modalsManager.pop();
  };

  const removeFile = (fileIndex: number): void => {
    dataTransferRef.current.items.clear();

    setFilesToUpload(prev => {
      const filtered: File[] = prev.filter((file: File, index: number) => {
        if(fileIndex === index) {
          return false;
        }

        dataTransferRef.current.items.add(file);
        return true;
      });

      const configFileName = fileIndex.toString() as Path<T>;
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
      "Settings", 
      <FileSettingForm mimeType={file.type} onSubmit={saveFileOptions} defaultValues={getValues(name)}/>
    );
  };

  return(
    <Fragment>
      <div className={scss.input_file_container}>
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
        {filesToUpload.map((file: File, index: number) => (
          <div key={index} className={scss.input_file_preview}>
            <section className={scss.input_file_preview_header}>
              <p>{file.name}</p>
              <section className={scss.input_file_prevew_actions_section}>
                <button
                  type="button"
                  onClick={() => openFileSettingModal(index, file)}>
                  <SettingsIcon strokeWidth={1.2}/>
                </button>
                <button 
                  type="button" 
                  onClick={() => removeFile(index)}>
                  <CircleXIcon strokeWidth={1.2}/>
                </button>
              </section>
            </section>
            <div>{getPreviewTag(file.type, URL.createObjectURL(file))}</div>
          </div>
        ))}
      </div>
      {error ? <InputErrorMessage message={error}/> : null} 
   </Fragment>
  )
};
