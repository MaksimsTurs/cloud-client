import type { FEItem } from "../../reducers/file-explorer/file-explorer.type";

export type UseFEHistoryReturn = {
  isLoading: boolean
  isFetchDirectory: boolean
  isRoot: boolean
  hasRoot: boolean
  items: FEItem[]
  parent?: FEItem
  paths: string[]
  path: string

  getItem: FEGetItem
  close: FEClose
  open: FEOpen
};

export type FESyncAction<P, T extends string = string> = (payload: P) => { payload: P, type: T };

type FEGetItem = (id?: string) => FEItem | undefined;

type FEClose = (from: number) => boolean;

type FEOpen = (name: string, id?: string) => Promise<boolean>;
