import type { ReactNode } from "react";

import scss from "./Icon-Button-Skeleton.module.scss";

export default function IconButtonSkeleton(): ReactNode {
  return <button className={scss.button_skeleton}></button>;
};
