import type { PayloadAction } from "@reduxjs/toolkit";

export type FEState = {
  isFetchDirectory: boolean
  history: FEHistory
};

export type FEHistory = {
  items: FEItem[][]
  paths: string[]
  parents: FEItem[]
  path: string
};

export type FEItem = {
  id: string
  user_id: string
  parent_id: string
  name: string
  type: number
};

export type FEItemRecord = Record<string, FEItem>;

//####################################################################################

export type FEGetItemsReturn = {
  parent: FEItem
  items: FEItem[]
  name: string
};

export type FEGetItemsParams = {
  name: string
  id?: string
};

export type FEReadItemsPayloadAction = PayloadAction<FEGetItemsReturn>;

//####################################################################################

export type FECloseItem = number | -1; // index;

export type FECloseItemPayloadAction = PayloadAction<FECloseItem>;

//####################################################################################

export type FECopyItemsReturn = Record<string, FEItem>;

export type FECopyItemsParams = {
  parentId?: string
  items: Record<string, FEItem>
};

export type FECopyItemsPayloadAction = PayloadAction<FECopyItemsReturn>;

//####################################################################################

export type FEMoveItemsParams = {
  parentId?: string
  items: Record<string, FEItem> 
};

export type FEMoveItemsReturn = Record<string, FEItem>;

export type FEMoveItemsPayloadAction = PayloadAction<FEMoveItemsReturn>;

//####################################################################################

export type FERemoveItemsParams = Record<string, FEItem>;

export type FERemoveItemsReturn = Record<string, FEItem>;

export type FERemoveItemsPayloadAction = PayloadAction<FERemoveItemsReturn>;

//####################################################################################

export type FEUploadItemsParams = {
  files: FileList;
  parentId?: string
};

export type FEUploadItemsReturn = FEItem[];

export type FEUploadItemsPayloadAction = PayloadAction<FEUploadItemsReturn>;

//####################################################################################

export type FECreateItemReturn = FEItem;

export type FECreateItemParams = {
  name: string
  path: string
  parentId?: string
};

export type FECreateDirPayloadAction = PayloadAction<FECreateItemReturn>;

//####################################################################################
