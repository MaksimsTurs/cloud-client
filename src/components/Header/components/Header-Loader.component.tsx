import type { ReactNode } from "react";

import scss from "../scss/Header-Loader.module.scss";

import IconButtonSkeleton from "@ui/Icon-Button/Icon-Button-Skeleton.componen";

export default function HeaderLoader(): ReactNode {
  return(
    <header className={scss.header_loader_container}>
      <IconButtonSkeleton type="full"/>
      <IconButtonSkeleton type="full"/>
      <IconButtonSkeleton type="icon-only"/>
      <IconButtonSkeleton type="icon-only"/>
      <IconButtonSkeleton type="text-only"/>
    </header>
  );
};
