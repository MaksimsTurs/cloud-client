import type { ReactNode } from "react";
import type { User } from "@root/global.type";

import { useEffect } from "react";

import { FileExplorer } from "@feature/file-explorer/file-explorer.feature";

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

  return <FileExplorer/>;
};
