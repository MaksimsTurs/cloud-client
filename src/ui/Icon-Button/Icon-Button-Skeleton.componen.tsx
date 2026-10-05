import type { ReactNode } from "react";
import type { HybrideButtonSkeletonProps } from "./Hybride-Button.type";

import scss from "./Hybride-Button-Skeleton.module.scss";

export default function IconButtonSkeleton({ type }: HybrideButtonSkeletonProps): ReactNode {
  const subClassTable: Record<string, string> = {
    "text-only": scss.hybride_button_skeleton__text_only!,
    "icon-only": scss.hybride_button_skeleton__icon_only!,
    "full": scss.hybride_button_skeleton__full!
  };

  return <button className={`${scss.hybride_button_skeleton} ${subClassTable[type]}`}></button>;
};
