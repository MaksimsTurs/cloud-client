import type { ReactNode, SyntheticEvent } from "react";
import type { FieldValues } from "react-hook-form";
import type { InputFileProps } from "./Input-File.type";

import scss from "./Input-File.module.scss";

import { DownloadIcon, XIcon } from "lucide-react";
import { Fragment, Activity, useState } from "react";

import { formatNumber } from "@util/std/std.util";

import { FormatNumberUnits } from "@util/std/number/format-number.enum";

export default function InputFile<P extends FieldValues>({ name, accept, error, options, register }: InputFileProps<P>): ReactNode {
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
  const fileListMode = filesToUpload.length ? "visible" : "hidden";
  const fileInputMode = !filesToUpload.length ? "visible" : "hidden";

  const upload = (event: SyntheticEvent<HTMLInputElement>): void => {
    const { files } = event.currentTarget;

    if(files) {
      setFilesToUpload(Array.from({ length: files.length }).map((_, index) => files.item(index)!));
    }
  };

  const removeFile = (file: File): void => {
    setFilesToUpload(prev => prev.filter(item => item.name != file.name));
  };

  return(
    <Fragment>
      <Activity mode={fileListMode}>
        <ul className={scss.input_file_list}>
          {filesToUpload.map(file => (
            <li className={scss.input_file_item} key={file.name}>
              <p className={scss.input_file_name}>{file.name}</p>
              <div className={scss.input_file_data}>
                <p>{formatNumber(file.size, { unit: FormatNumberUnits.DATA_UNIT })}</p>
                <button 
                  type="button" 
                  onClickCapture={() => removeFile(file)}>
                  <XIcon strokeWidth={2} size={15}/>
                </button>
              </div>
            </li>
          ))}
        </ul>
        {error ? <p className={scss.input_file_error_message}>{error}</p> : error}
      </Activity>
      <Activity mode={fileInputMode}>
        <label className={scss.input_file_label} htmlFor={name}>
          <DownloadIcon/>
          <p>Select Files</p>
          <input
            {...register(name, options)}
            id={name}
            accept={accept?.join(",") || ""} 
            multiple 
            type="file" 
            onInput={upload}/>
        </label>
      </Activity>
   </Fragment>
  )
};
