import type { ReactNode } from "react";
import type { FEItem } from "@feature/file-explorer/reducers/file-explorer/file-explorer.type";
import type { SubmitHandler } from "react-hook-form";

import { FormBody } from "@ui/Form/Form/Form.component";
import InputText from "@ui/Form/Input-Text/Input-Text.component";
import SubmitButton from "@ui/Submit-Button/Submit-Button.component";

import { useForm } from "react-hook-form";

import { useFileExplorer, useFileExplorerHistory } from "@feature/file-explorer/file-explorer.feature";
import { useModalsManager } from "@feature/modals-manager/modals-manager.feature";

import scss from "./Create-Item-Form.module.scss";

import FE_ITEM_TYPES from "@feature/file-explorer/const/FE-ITEM-TYPES.const";

export default function CreateItemForm(): ReactNode {
  const { handleSubmit, register, formState: { errors }} = useForm<FEItem>();
  const fe = useFileExplorer();
  const feHistory = useFileExplorerHistory();
  const modalsManager = useModalsManager();

  const createItem: SubmitHandler<FEItem> = async (dirData): Promise<void> => {
    const isOk: boolean = await fe.create(FE_ITEM_TYPES.DIRECTORY, dirData.name, feHistory.parent?.id);

    if(isOk) {
      modalsManager.pop();
    }
  };

  return(
    <div className={scss.create_item_form_container}>
      <FormBody onSubmit={handleSubmit(createItem)}>
        <InputText 
          register={register}
          error={errors.name?.message}
          name="name" 
          type="text"
          placeholder="Item name"
          autoFocus
          options={{
            required: "Name can not be empty!",
            maxLength: { value: 64, message: "Name can be maximum 64 characters long!" },
            pattern: { value: /[a-zA-Z0-9\-\.]/, message: "Name have suspicous characters!" }
          }}/>
        <SubmitButton text="Create" disabled={feHistory.isLoading}/>
      </FormBody>
    </div>
 );
};
