import type { ReactNode } from "react";
import type { User } from "@root/global.type";

import { Fragment, useEffect } from "react";

import { FileExplorer } from "@feature/file-explorer/file-explorer.feature";
import Metadata from "@component/Metadata/Metadata.component";

import { useFileExplorerHistory } from "@feature/file-explorer/file-explorer.feature";

import { useUser } from "@service/auth/auth.service";

export default function Page(): ReactNode {
  const feHistory = useFileExplorerHistory();
  const user = useUser<User>();

  useEffect(() => {
    if(!feHistory.hasRoot) {
      feHistory.open("root", user.root_id);
    }
  }, [feHistory.hasRoot]);
  
  return(
    <Fragment>
      <Metadata 
        title="File Explorer"
        charset="utf-8"
        name="description" content="Main page, here you can upload and manipulate with you files and folders."/>
      <FileExplorer/>
    </Fragment>
  );
};
