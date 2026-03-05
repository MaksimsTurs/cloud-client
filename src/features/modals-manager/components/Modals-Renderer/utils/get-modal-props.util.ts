import type { ModalState } from "@feature/modals-manager/reducers/modals-manager.type";
import type { ModalProps } from "../../Modal/Modal.type";

import { MODALS_DATA } from "@feature/modals-manager/hooks/use-modals-manager.hook";

export default function getModalProps(state: ModalState, index: number): ModalProps {
  return {...MODALS_DATA.get(index), ...state };
};
