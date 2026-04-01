import type { MouseEvent, ReactNode } from "react";
import type { ContextMenuPosition, ContextMenuProps } from "./Context-Menu.type";

import scss from "./Context-Menu.module.scss";

import { FilePlusIcon, FolderPlusIcon } from "lucide-react";
import { useState } from "react";

import UploadFilesForm from "@component/Upload-Files-Form/Upload-Files-Form.component";
import CreateItemForm from "@component/Create-Item-Form/Create-Item-Form.component";

import { useModalsManager } from "@feature/modals-manager/modals-manager.feature";

export default function ContextMenu({ children }: ContextMenuProps): ReactNode {
  const modalsManager = useModalsManager();
  const [position, setPosition] = useState<ContextMenuPosition>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleContextMenu = (event: MouseEvent<HTMLDivElement>): void => {
    event.preventDefault();
      
    setIsVisible(true);  
    setPosition({ x: event.clientX + 10, y: event.clientY + 10 });
  };

  const handleContextMenuClick = () => {
    setIsVisible(false);
  };

  const createFolder = (event: MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation();
    modalsManager.push("Create Folder", <CreateItemForm/>);
    setIsVisible(false);
  };

  const uploadFiles = (event: MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation();
    modalsManager.push("Add Files", <UploadFilesForm/>);
    setIsVisible(false);
  };

  return(
    <div 
      className={scss.context_menu_container}
      onContextMenu={handleContextMenu}
      onClick={handleContextMenuClick}>
      <ul 
        style={{ 
          transform: `translate(${position.x}px, ${position.y}px)`,
          visibility: isVisible ? "visible" : "hidden"
        }} 
        className={scss.context_menu_list}>
        <li>
          <button className={scss.context_menu_button} onClick={createFolder}>
            <FolderPlusIcon strokeWidth={1}/>
            <p>Add Folder</p>
          </button>
        </li>
        <li>
          <button className={scss.context_menu_button} onClick={uploadFiles}>
            <FilePlusIcon strokeWidth={1}/>
            <p>Add Files</p>
          </button>
        </li>
      </ul>
      {children}
    </div>
  );
};
