import type { ReactNode } from "react";
import type { ModalState } from "../../reducers/modals-manager.type";

import { Fragment } from "react";

import useModalsManager from "../../hooks/use-modals-manager.hook";

import Modal from "../Modal/Modal.component";

import getModalProps from "./utils/get-modal-props.util";

export default function ModalsRenderer(): ReactNode {
  const { modals } = useModalsManager();

  return <Fragment>{modals.map((state: ModalState, index: number) => <Modal {...getModalProps(state, index) } key={index}/>)}</Fragment>;
};
