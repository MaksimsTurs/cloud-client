import { createSlice } from "@reduxjs/toolkit";

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
  FEItemRecord, 
} from "./file-explorer.type";

import getItems from "./actions/get-items.action";
import createItem from "./actions/create-item.action";
import copyItems from "./actions/copy-items.action";
import moveItems from "./actions/move-items.action";
import removeItems from "./actions/remove-items.action";
import uploadItems from "./actions/upload-items.action";

import { isUndefined } from "@util/is.util";

const initState: FEState = {
  isFetchDirectory: false,
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
      state.isFetchDirectory = true;
    })
    .addCase(getItems.rejected, function(state: WritableDraft<FEState>): void {
      state.isFetchDirectory = false;
    })
    .addCase(getItems.fulfilled, function(state: WritableDraft<FEState>, action: FEReadItemsPayloadAction): void {
      const { name, items, parent } = action.payload;

      state.history.items.push(items);
      state.history.paths.push(name);
      state.history.parents.push(parent);
      state.history.path = [...state.history.path, name].join("/");

      state.isFetchDirectory = false;
    })
    .addCase(copyItems.fulfilled, function(state: WritableDraft<FEState>, action: FECopyItemsPayloadAction): void {
      state.history.items.at(-1)?.push(...action.payload);
    })
    .addCase(removeItems.fulfilled, function(state: WritableDraft<FEState>, action: FERemoveItemsPayloadAction): void {
      const items: FEItemRecord = action.payload;
      const filtered: FEItem[] = state.history.items.at(-1)?.filter(item => isUndefined(items[item.id])) || [];

      state.history.items[state.history.items.length - 1] = filtered;
    })
    .addCase(moveItems.fulfilled, function(state: WritableDraft<FEState>, action: FEMoveItemsPayloadAction): void {
      const items: FEItemRecord = action.payload;
      
      state.history.items.at(-1)?.push(...Object.values(items));
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
