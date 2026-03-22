import type { ReactNode } from "react";

import { Fragment, useEffect } from "react";

import { FileExplorer } from "@feature/file-explorer/file-explorer.feature";
import { Link } from "@hook/use-react-router/use-react-router.hook";
import Empty from "@ui/Empty/Empty.component";
import Metadata from "@component/Metadata/Metadata.component";

import { useFileExplorerHistory } from "@feature/file-explorer/file-explorer.feature";
import { useAuthIsAuthorized, useAuthIsAuthorizing } from "@service/auth/auth.service";

export default function Page(): ReactNode {
  const feHistory = useFileExplorerHistory();
  const isAuthorized = useAuthIsAuthorized();
  const isAuthorizing = useAuthIsAuthorizing();

  useEffect(() => {
    if(!isAuthorizing && isAuthorized && !feHistory.hasRoot) {
      feHistory.open("root");
    }
  }, [isAuthorizing, isAuthorized]);

  return(
    <Fragment>
      <Metadata title="File Explorer"/>
      {!feHistory.isFetchDirectory && !isAuthorized ? 
      <Empty
        header="Not Authenticated!"
        main="It looks like you either haven't logged into your account, or do not have an account."
        footer={
          <Fragment>
            <Link href="/log-in">Log in</Link>
            or
            <Link href="/log-up">Log up</Link>
          </Fragment>
        }/> :
      <FileExplorer/>}
    </Fragment>
  );
};
