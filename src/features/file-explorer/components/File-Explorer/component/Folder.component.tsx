import scss from "../scss/Folder.module.scss";

import type { ReactNode } from "react";
import type { FolderProps } from "../File-Explorer.type";

import { CheckIcon, FolderClosedIcon } from "lucide-react";

import { useFileExplorerHistory } from "@feature/file-explorer/file-explorer.feature";

export default function Folder({ folder, isSelected }: FolderProps): ReactNode {
  const feHistory = useFileExplorerHistory();

  const openFolder = async (): Promise<void> => {
    await feHistory.open(folder.name, folder.id);
  };

  return(
    <button 
      onClick={openFolder} 
      className={`${isSelected ? scss.folder_container_selected : ""} ${scss.folder_container}`}
      data-item-id={folder.id}>
      <FolderClosedIcon strokeWidth={1} size={25}/>
      <p>{folder.name}</p>
      {isSelected ? 
      <div className={scss.folder_selection_status}>
        <CheckIcon/>
      </div> : null}
    </button>
  );
};
