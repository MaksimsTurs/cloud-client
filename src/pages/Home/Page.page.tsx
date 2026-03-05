import type { ReactNode } from "react";

import { Fragment, useEffect } from "react";

import { FileExplorer } from "@feature/file-explorer/file-explorer.feature";
import Empty from "@ui/Empty/Empty.component";
import Title from "@component/Title/Title.component";

import serializeError from "@util/serialize-error.util";

import { useFileExplorerHistory } from "@feature/file-explorer/file-explorer.feature";
import { useAuth } from "@service/auth/auth.service";

export default function Page(): ReactNode {
  const feHistory = useFileExplorerHistory();
  const { isAuthorized } = useAuth({ serializeError });

  useEffect(() => {
    if(isAuthorized && !feHistory.hasRoot) {
      feHistory.open("root");
    }
  }, [])

  return(
    <Fragment>
      <Title>File Explorer</Title>
      {!feHistory.isFetchDirectory && !isAuthorized && !isAuthorized ? 
      <Empty>You need log in or log up first!</Empty> :
      <FileExplorer/>}
    </Fragment>
  );
};
