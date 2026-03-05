import Button from "@ui/Button/Button.component";
import CreateItemForm from "@component/Create-Item-Form/Create-Item-Form.component";
import UploadFilesForm from "@component/Upload-Files-Form/Upload-Files-Form.component";

import { DownloadIcon, FolderPlusIcon } from "lucide-react";

import type { ReactNode } from "react";

import { useModalsManager } from "@feature/modals-manager/modals-manager.feature";

export default function ActionsSection(): ReactNode {
  const modalsManager = useModalsManager();

  const openUploadModal = (): void => {
    modalsManager.push("Upload files", <UploadFilesForm/>);
  };

  const openCreateDirModal = () => {
    modalsManager.push("Create new Directory", <CreateItemForm/>);
  };

  return(
    <section>
      <Button onClick={openUploadModal}>
        <DownloadIcon strokeWidth={1} size={20}/>
      </Button>  
      <Button onClick={openCreateDirModal}>
        <FolderPlusIcon strokeWidth={1} size={20}/>
      </Button>
    </section>
  );
};
