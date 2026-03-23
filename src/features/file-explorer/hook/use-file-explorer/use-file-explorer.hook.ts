import type { UseFEReturn } from "./use-file-explorer.type";
import type { 
  FECopyItemsParams, 
  FECopyItemsReturn, 
  FECreateItemParams, 
  FECreateItemReturn, 
  FERemoveItemsParams, 
  FERemoveItemsReturn, 
  FEMoveItemsParams, 
  FEMoveItemsReturn, 
  FEUploadItemsParams, 
  FEUploadItemsReturn 
} from "@feature/file-explorer/reducers/file-explorer/file-explorer.type";

import copyItemsAction from "../../reducers/file-explorer/actions/copy-items.action";
import moveItemsAction from "../../reducers/file-explorer/actions/move-items.action";
import removeItemsAction from "../../reducers/file-explorer/actions/remove-items.action";
import uploadItemsAction from "../../reducers/file-explorer/actions/upload-items.action";
import createItemAction from "../../reducers/file-explorer/actions/create-item.action";

import useTryDispatch from "../use-try-dispatch/use-try-dispatch.hook";
import { useFileExplorerHistory } from "@feature/file-explorer/file-explorer.feature";

import { useState } from "react";

export default function useFileExplorer(): UseFEReturn {
  const { asyncDispatcher } = useTryDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const feHistory = useFileExplorerHistory();

  return {
    isLoading,
    copy: async function(items, parentId) {
      setIsLoading(true);
      const result = await asyncDispatcher<FECopyItemsReturn, FECopyItemsParams>(copyItemsAction, { items, parentId }); 
      setIsLoading(false);
      return result;
    },
    move: async function(items, itemPaths, parentId) {
      setIsLoading(true);
      const result = await asyncDispatcher<FEMoveItemsReturn, FEMoveItemsParams>(moveItemsAction, { items,  itemPaths, parentId }); 
      setIsLoading(false);
      return result;
    },
    remove: async function(items, itemPaths) {
      setIsLoading(true);
      const result = await asyncDispatcher<FERemoveItemsReturn, FERemoveItemsParams>(removeItemsAction, { items, itemPaths }); 
      setIsLoading(false);
      return result;
    },
    create: async function(_type, name, parentId) {
      setIsLoading(true);
      const result = await asyncDispatcher<FECreateItemReturn, FECreateItemParams>(createItemAction, { name, parentId, path: feHistory.path }); 
      setIsLoading(false);
      return result;
    },
    upload: async function(files, parentId?: string) {
      setIsLoading(true);
      const result = await asyncDispatcher<FEUploadItemsReturn, FEUploadItemsParams>(uploadItemsAction, {...files, parentId }); 
      setIsLoading(false);
      return result;
    }
  };
};
