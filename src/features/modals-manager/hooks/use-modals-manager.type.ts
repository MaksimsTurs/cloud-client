import type { ReactNode } from "react";
import type { ModalState } from "../reducers/modals-manager.type";
import type { ModalProps } from "../components/Modal/Modal.type";

export type UseModalsManagerReturn = {
  modals: ModalState[]
  push: UseModalsManagerPush
  pop: UseModalsManagerPop
};

export type UseModalsManagerData = Omit<ModalProps, "title">;

type UseModalsManagerPush = (title: string, children: ReactNode) => void;

type UseModalsManagerPop = () => void;
