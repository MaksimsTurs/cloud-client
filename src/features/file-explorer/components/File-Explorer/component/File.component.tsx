import scss from "../scss/File.module.scss"

import type { FileProps } from "../File-Explorer.type";
import type { ReactNode } from "react";

import { CheckIcon } from "lucide-react";

import getIconByExtention from "../util/get-icon-by-extention.util";

import { useNavigate } from "@hook/use-react-router/use-react-router.hook";

export default function File({ file, isSelected }: FileProps): ReactNode {
  const navigate = useNavigate();

  const openFile = (): void => {
    navigate(`/item/${file.id}`);
  };

  return(
    <button 
      onClick={openFile}
      data-item-id={file.id}
      className={`${isSelected ? scss.file_container_selected : ""} ${scss.file_container}`}>
      {getIconByExtention(file.name)}
      <p>{file.name}</p>
      {isSelected ? 
      <div className={scss.file_selection_status}>
        <CheckIcon/>
      </div> : null}
    </button>
  );
};
