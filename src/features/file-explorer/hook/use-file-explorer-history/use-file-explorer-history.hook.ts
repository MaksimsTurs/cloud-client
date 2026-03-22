import type { RootState } from "@reducer/store";
import type { FEGetItemsParams, FEGetItemsReturn, FEState } from "@feature/file-explorer/reducers/file-explorer/file-explorer.type";
import type { UseFEHistoryReturn } from "./use-file-explorer-history.type";

import getItems from "@feature/file-explorer/reducers/file-explorer/actions/get-items.action";
import { closeDir } from "@feature/file-explorer/reducers/file-explorer/file-explorer.slice";

import caller from "@util/caller/caller.util";

import { useSelector } from "react-redux";
import { useState } from "react";

import useTryDispatch from "../use-try-dispatch/use-try-dispatch.hook";

export default function useFileExplorerHistory(): UseFEHistoryReturn {
  const { history, isFetchDirectory } = useSelector<RootState, FEState>(state => state.fileExplorer);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { asyncDispatcher, syncDispatcher } = useTryDispatch();

  return {
    isLoading,
    isFetchDirectory,
    isRoot: history.items.length <= 1,
    hasRoot: history.paths.at(0) === "root",
    items: history.items.at(-1) || [],
    paths: history.paths,
    parent: history.parents.at(-1),
    path: history.path,
    getItem: function(id) {
      if(!id) {
        return undefined;
      }
     
      const [data, error] = caller(() => {
        return history.items.at(-1)?.find(item => item.id === id);
      });

      if(error) {
        return undefined
      }

      return data;
    },
    close: function(from) {
      return syncDispatcher(closeDir, from);
    },
    open: async function(name, id) {
      setIsLoading(true);
      const result = await asyncDispatcher<FEGetItemsReturn, FEGetItemsParams>(getItems, { name, id });
      setIsLoading(false);
      return result;
    },
  }
};
