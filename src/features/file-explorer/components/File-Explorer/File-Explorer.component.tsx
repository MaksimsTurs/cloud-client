import type { ReactNode } from "react";

import scss from "./File-Explorer.module.scss";

import File from "./component/File.component";
import BackButton from "./component/Back-Button.component";
import Folder from "./component/Folder.component";
import BreadCrumbs from "./component/Bread-Crumbs.component";
import ContextMenu from "../Context-Menu/Context-Menu.component";
import CommonSkeleton from "@ui/Common-Skeleton/Common-Skeleton.component";

import { useFileExplorerHistory, useFileExplorerItemsEvents } from "@feature/file-explorer/file-explorer.feature";

import hasKey from "@feature/file-explorer/utils/has-key.util";

import FE_ITEM_TYPES from "../../const/FE-ITEM-TYPES.const";

export default function FileExplorer(): ReactNode {
  const feHistory = useFileExplorerHistory();
  const feEvent = useFileExplorerItemsEvents();

  if(feHistory.isLoading) {
    return(
      <div className={scss.explorer_container}>
        <BreadCrumbs/>
        <CommonSkeleton/>
      </div>
    );
  }

  return(
    <ContextMenu>
      <div className={scss.explorer_container}>
        <BreadCrumbs/>
        <div className={scss.explorer_body}>
          <BackButton/>
          {feHistory
            .items
            .map(item => 
              item.type === FE_ITEM_TYPES.FILE ? 
                <File key={item.id} file={item} isSelected={hasKey(item.id, feEvent.selected)}/> : 
                <Folder key={item.id} folder={item} isSelected={hasKey(item.id, feEvent.selected)}/>)}
        </div>
      </div>
    </ContextMenu>
  );
};
