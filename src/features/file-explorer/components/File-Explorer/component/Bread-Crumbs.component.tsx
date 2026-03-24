import scss from "../scss/Bread-Crumbs.module.scss";

import type { ReactNode } from "react";

import { useFileExplorerHistory } from "@feature/file-explorer/file-explorer.feature";

export default function BreadCrumbs(): ReactNode {
  const feHistory = useFileExplorerHistory();
  
  const closeFolder = (index: number): void => {
    feHistory.close(index);
  };

  if(!feHistory.paths.length) {
    return(
      <ul className={scss.breadcrumbs_list}>
        <li className={scss.breadcrumbs_list_item}>
          <p>/</p>
        </li>
      </ul>
    );
  }

  return(
    <ul className={scss.breadcrumbs_list}>
      {feHistory.paths.map((crumb: string, index: number) =>
        <li key={crumb} className={scss.breadcrumbs_list_item}>
          <p>/</p>
          <p onClick={feHistory.isLoading ? undefined : () => closeFolder(index)}>{crumb}</p>
        </li>
      )}
    </ul>
  );
};
