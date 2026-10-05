import scss from "../scss/Back-Button.module.scss";

import type { ReactNode } from "react";

import { FolderClosedIcon } from "lucide-react";

import { useFileExplorerHistory } from "@feature/file-explorer/file-explorer.feature";

export default function BackButton(): ReactNode {
  const feHistory = useFileExplorerHistory();

  const closeCurrentFolder = async (): Promise<void> => {
    feHistory.close(-1);
  };

  return(
    <button 
      onClick={closeCurrentFolder}
      className={scss.back_button_container}>
      <FolderClosedIcon strokeWidth={1} size={25}/>
      <p>..</p>
    </button>
  );
};
