import scss from "../scss/Back-Button.module.scss";

import type { ReactNode } from "react";
import type { BackButtonProps } from "../File-Explorer.type";

import { useFileExplorerHistory } from "@feature/file-explorer/file-explorer.feature";

export default function BackButton({ isRoot }: BackButtonProps): ReactNode {
  const feHistory = useFileExplorerHistory();

  const closeCurrentFolder = async (): Promise<void> => {
    feHistory.close(-1);
  };

  return(
    <button 
      onClick={closeCurrentFolder}
      disabled={isRoot}
      className={scss.back_button_container}>
      <p>..</p>
    </button>
  );
};
