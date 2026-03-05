import type { ModalsManagerState } from "../reducers/modals-manager.type";
import type { ModalProps } from "../components/Modal/Modal.type";
import type { RootState, AppDispatch } from "@reducer/store";
import type { ReactNode } from "react";
import type { UseModalsManagerData, UseModalsManagerReturn } from "./use-modals-manager.type";

import { useSelector, useDispatch } from "react-redux";

import { pushModal, popModal } from "../reducers/modals-manager.slice";

export const MODALS_DATA: Map<number, UseModalsManagerData> = new Map<number, Omit<ModalProps, "title">>();

export default function useModalsManager(): UseModalsManagerReturn {
  const { stack } = useSelector<RootState, ModalsManagerState>(state => state.modalsManager);
  const dispatch = useDispatch<AppDispatch>();

  return {
    modals: stack,
    push: function(title: string, children: ReactNode): void {      
      MODALS_DATA.set(stack.length, { children });
      dispatch(pushModal(title));
    },
    pop: function(): void {
      dispatch(popModal());
    }
  }
};
