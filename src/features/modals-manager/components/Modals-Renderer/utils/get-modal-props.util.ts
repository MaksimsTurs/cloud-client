import type { UseModalsManagerData } from "@root/features/modals-manager/hooks/use-modals-manager.type";

import { MODALS_DATA } from "@feature/modals-manager/hooks/use-modals-manager.hook";

export default function getModalProps(index: number): UseModalsManagerData {
  return MODALS_DATA.get(index)!;
};
