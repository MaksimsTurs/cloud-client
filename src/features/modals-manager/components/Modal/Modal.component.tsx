import type { ReactNode } from "react";
import type { ModalProps } from "./Modal.type";

import scss from "./Modal.module.scss";

import HybrideButton from "@ui/Hybride-Button/Hybride-Button.component";

import { XIcon } from "lucide-react";

import useModalsManager from "../../hooks/use-modals-manager.hook";

export default function Modal({ children, title }: ModalProps): ReactNode {
  const modalsManager = useModalsManager();

  const closeModal = (): void => {
    modalsManager.pop();
  };

  return(
    <div className={scss.modal_container}>
      <div className={scss.modal_body}>
        <section className={scss.modal_header}>
          <p>{title}</p>
          <HybrideButton icon={<XIcon/>} onClick={closeModal}/>
        </section>
        {children}
      </div>
    </div>
  );
};
