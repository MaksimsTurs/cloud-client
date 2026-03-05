import type { ReactNode } from "react";

import scss from "./File-Explorer-Item-Loader.module.scss";

export default function FileExplorerItemLoader(): ReactNode {
  return(
    <div className={scss.file_explorer_item_loader_container}>
      <div className={scss.file_explorer_item_loader_icon}></div>
      <div className={scss.file_explorer_item_loader_name}></div>
    </div>
  );
};
