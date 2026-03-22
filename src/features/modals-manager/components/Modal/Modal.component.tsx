import type { ReactNode } from "react";
import type { ModalProps } from "./Modal.type";

import scss from "./Modal.module.scss";

import IconButton from "@ui/Icon-Button/Icon-Button.component";

import { X } from "lucide-react";

import useModalsManager from "../../hooks/use-modals-manager.hook";

export default function Modal({ children, title }: ModalProps): ReactNode {
  const { pop } = useModalsManager();

  const closeModal = (): void => {
    pop();
  };

  return(
    <div className={scss.modal_container}>
      <div className={scss.modal_body}>
        <section className={scss.modal_header}>
          <p>{title}</p>
          <IconButton onClick={closeModal}>
            <X/>
          </IconButton>
        </section>
        {children}
      </div>
    </div>
  );
};
