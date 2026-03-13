import type { ReactNode } from "react";

import scss from "./Header-Loader.module.scss";

import IconButtonSkeleton from "@ui/Icon-Button/Icon-Button-Skeleton.componen";

export default function HeaderLoader(): ReactNode {
  return(
    <header className={scss.header_loader_container}>
      <nav>
        <IconButtonSkeleton/>
        <IconButtonSkeleton/>
      </nav>
      <section>
        <IconButtonSkeleton/>
        <IconButtonSkeleton/>
        <IconButtonSkeleton/>
      </section>
    </header>
  );
};
