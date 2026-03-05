import type { ReactNode } from "react";

import scss from "../scss/Button-Skeleton.module.scss";

export default function ButtonSkeleton(): ReactNode {
  return <button disabled className={scss.button_skeleton}></button>;
};
