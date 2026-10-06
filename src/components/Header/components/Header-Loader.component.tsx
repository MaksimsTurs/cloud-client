import type { ReactNode } from "react";

import scss from "../scss/Header-Loader.module.scss";

import HybrideButtonSkeleton from "@ui/Hybride-Button/Hybride-Button-Skeleton.componen";

export default function HeaderLoader(): ReactNode {
  return(
    <header className={scss.header_loader_container}>
      <HybrideButtonSkeleton type="full"/>
      <HybrideButtonSkeleton type="full"/>
      <HybrideButtonSkeleton type="icon-only"/>
      <HybrideButtonSkeleton type="icon-only"/>
      <HybrideButtonSkeleton type="text-only"/>
    </header>
  );
};
