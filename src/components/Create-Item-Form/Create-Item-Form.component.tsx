import type { ReactNode } from "react";
import type { FEItem } from "@feature/file-explorer/reducers/file-explorer/file-explorer.type";
import type { SubmitHandler } from "react-hook-form";

import { FormBody } from "@ui/Form/Form.component";
import InputText from "@ui/Input-Text/Input-Text.component";
import TextButton from "@ui/Text-Button/Text-Button.component";

import { useForm } from "react-hook-form";

import { useFileExplorer, useFileExplorerHistory } from "@feature/file-explorer/file-explorer.feature";
import { useModalsManager } from "@feature/modals-manager/modals-manager.feature";

import scss from "./Create-Item-Form.module.scss";

export default function CreateItemForm(): ReactNode {
  const methods = useForm<FEItem>();
  const fe = useFileExplorer();
  const feHistory = useFileExplorerHistory();
  const modalsManager = useModalsManager();

  const { formState: { isSubmitting }} = methods;

  const createItem: SubmitHandler<FEItem> = async (dirData): Promise<void> => {
    const isOk: boolean = await fe.create(dirData.name, feHistory.parent?.id);

    if(isOk) {
      modalsManager.pop();
    }
  };

  return(
    <FormBody className={scss.create_folder_form_container} {...methods } onSubmit={createItem}>
      <InputText 
        name="name" 
        type="text"
        placeholder="Folder name"
        autoFocus
        options={{
          required: "Name can not be empty!",
          maxLength: { value: 64, message: "Name can be maximum 64 characters long!" },
          pattern: { value: /[a-zA-Z0-9\-\.]/, message: "Name have suspicous characters!" }
        }}/>
      <TextButton text="Submit" disabled={isSubmitting}/>
    </FormBody>
 );
};
