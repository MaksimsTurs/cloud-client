import type { ReactNode } from "react";

import scss from "../scss/Header-Loader.module.scss";

import ButtonSkeleton from "@ui/Button/components/Button-Skeleton.componen";

export default function HeaderLoader(): ReactNode {
  return(
    <header className={scss.header_loader_container}>
      <nav>
        <ButtonSkeleton/>
        <ButtonSkeleton/>
      </nav>
      <section>
        <ButtonSkeleton/>
        <ButtonSkeleton/>
      </section>
    </header>
  );
};
