import { createSlice, current } from "@reduxjs/toolkit";

import type { ActionReducerMapBuilder, WritableDraft } from "@reduxjs/toolkit";
import type { 
  FEState, 
  
  FECloseItemPayloadAction,
  FECreateDirPayloadAction,
  FERemoveItemsPayloadAction,
  FEMoveItemsPayloadAction,
  FECopyItemsPayloadAction,
  FEUploadItemsPayloadAction,
  FEReadItemsPayloadAction,

  FEItem,
} from "./file-explorer.type";

import getItems from "./actions/get-items.action";
import createItem from "./actions/create-item.action";
import copyItems from "./actions/copy-items.action";
import moveItems from "./actions/move-items.action";
import removeItems from "./actions/remove-items.action";
import uploadItems from "./actions/upload-items.action";

const initState: FEState = {
  isLoading: true,
  history: {
    items: [],
    paths: [],
    parents: [],
    path: ""
  },
};

const slice = createSlice({
  name: 'fe',
  initialState: initState,
  reducers: {
    closeDir: function(state: WritableDraft<FEState>, actions: FECloseItemPayloadAction): void {
      const { paths } = state.history;
      const itemIndex: number = actions.payload;

      if(itemIndex === -1) {
        state.history.items.pop();
        state.history.paths.pop();
        state.history.parents.pop();
      } else {
        let count: number = (paths.length - itemIndex) - 1;

        state.history.items.splice(itemIndex + 1, count);
        state.history.paths.splice(itemIndex + 1, count);
        state.history.parents.splice(itemIndex + 1, count);
      }

      state.history.path = state.history.paths.join("/");
    },
  },
  extraReducers: function(builder: ActionReducerMapBuilder<FEState>) {
    builder
    .addCase(getItems.pending, function(state: WritableDraft<FEState>): void {
      state.isLoading = true
    })
    .addCase(getItems.rejected, function(state: WritableDraft<FEState>): void {
      state.isLoading = false;
    })
    .addCase(getItems.fulfilled, function(state: WritableDraft<FEState>, action: FEReadItemsPayloadAction): void {
      const { name, items, parent } = action.payload;

      state.history.items.push(items);
      state.history.paths.push(name);
      state.history.parents.push(parent);

      state.history.path = state.history.paths.join("/");

      state.isLoading = false;
    })
    .addCase(copyItems.pending, function(state: WritableDraft<FEState>): void {
      state.isLoading = true;
    })
    .addCase(copyItems.rejected, function(state: WritableDraft<FEState>): void {
      state.isLoading = false;
    })
    .addCase(copyItems.fulfilled, function(state: WritableDraft<FEState>, action: FECopyItemsPayloadAction): void {
      state.history.items.at(-1)?.push(...action.payload);
      state.isLoading = false;
    })
    .addCase(removeItems.pending, function(state: WritableDraft<FEState>): void {
      state.isLoading = true;
    })
    .addCase(removeItems.rejected, function(state: WritableDraft<FEState>): void {
      state.isLoading = false;
    })
    .addCase(removeItems.fulfilled, function(state: WritableDraft<FEState>, action: FERemoveItemsPayloadAction): void {
      const itemPaths: Record<string, string> = action.payload;
      const currPath: string[] = current(state.history.paths);

      for(let itemId in itemPaths) {
        const itemFolder: string = itemPaths[itemId];
        const itemFolderSplit: string[] = itemFolder.split("/");

        if(currPath.length >= itemFolderSplit.length) {
          state.history.items[itemFolderSplit.length - 1] = state.history.items[itemFolderSplit.length - 1].filter(item => item.id != itemId);
        }
      }

      state.isLoading = false;
    })
    .addCase(moveItems.pending, function(state: WritableDraft<FEState>): void {
      state.isLoading = true
    })
    .addCase(moveItems.rejected, function(state: WritableDraft<FEState>): void {
      state.isLoading = false;
    })
    .addCase(moveItems.fulfilled, function(state: WritableDraft<FEState>, action: FEMoveItemsPayloadAction): void {
      const { itemPaths, items } = action.payload;
      const currPath: string[] = current(state.history.paths);

      for(let itemId in itemPaths) {
        const itemFolder: string = itemPaths[itemId];
        const itemFolderSplit: string[] = itemFolder.split("/");
        const item: FEItem = items[itemId];

        if(currPath.length >= itemFolderSplit.length) {
          state.history.items[itemFolderSplit.length - 1] = state.history.items[itemFolderSplit.length - 1].filter(item => item.id != itemId);
        }

        state.history.items[currPath.length - 1].push(item);
      }

      state.isLoading = false;
    })
   .addCase(createItem.fulfilled, function(state: WritableDraft<FEState>, action: FECreateDirPayloadAction): void {
      state.history.items.at(-1)?.push(action.payload);
    })
   .addCase(uploadItems.fulfilled, function(state: WritableDraft<FEState>, action: FEUploadItemsPayloadAction): void {
      state.history.items.at(-1)?.push(...action.payload);
    })
  },
});

export default slice.reducer;
export const { closeDir } = slice.actions
