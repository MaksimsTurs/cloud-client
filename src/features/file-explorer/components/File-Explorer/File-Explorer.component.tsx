import scss from "./File-Explorer.module.scss";

import type { ReactNode } from "react";

import File from "./component/File.component";
import FileExplorerLoader from "../File-Explorer-Loader/File-Explorer-Loader.component";
import Folder from "./component/Folder.component";
import BreadCrumbs from "./component/Bread-Crumbs.component";
import ContextMenu from "../Context-Menu/Context-Menu.component";
import Empty from "@ui/Empty/Empty.component";

import { useFileExplorerHistory, useFileExplorerItemsEvents } from "@feature/file-explorer/file-explorer.feature";

import hasKey from "@feature/file-explorer/utils/has-key.util";

import FE_ITEM_TYPES from "../../const/FE-ITEM-TYPES.const";

export default function FileExplorer(): ReactNode {
  const feHistory = useFileExplorerHistory();
  const { selected } = useFileExplorerItemsEvents();

  if(feHistory.isFetchDirectory) {
    return(
      <div className={scss.explorer_container}>
        <BreadCrumbs/>
        <FileExplorerLoader/>
      </div>
    );
  }

  if(!feHistory.items.length) {
    return(
      <ContextMenu>
        <div className={scss.explorer_container}>
          <BreadCrumbs/>
          <Empty
            header="Folder is Empty!"
            main={`Looks like ${feHistory.paths.at(-1)} folder does not have any item!`}/>
        </div>
      </ContextMenu>
   );
  }
  
  return(
    <ContextMenu>
      <div className={scss.explorer_container}>
        <BreadCrumbs/>
        <div className={scss.explorer_body}>
          {feHistory
            .items
            .map(item => 
              item.type === FE_ITEM_TYPES.FILE ? 
                <File key={item.id} file={item} isSelected={hasKey(item.id, selected)}/> : 
                <Folder key={item.id} folder={item} isSelected={hasKey(item.id, selected)}/>)}
        </div>
      </div>
    </ContextMenu>
  );
};
