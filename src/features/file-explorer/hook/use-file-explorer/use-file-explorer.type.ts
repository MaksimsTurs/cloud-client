import type { FEItemRecord } from "../../reducers/file-explorer/file-explorer.type";
import type { AsyncThunkDispatchConfig, AsyncThunkConfig, AsyncThunkAction } from "@reduxjs/toolkit";

export type UseFEReturn = {
  isLoading: boolean
  copy: FECopy
  move: FEMove
  remove: FERemove
  create: FECreate
  upload: FEUpload
};

export type FEAction<R = any, P = any> = (arg: P, config?: AsyncThunkDispatchConfig) => AsyncThunkAction<R, P, AsyncThunkConfig>

type FECopy = (items: FEItemRecord, parentId?: string) => Promise<boolean>;

type FEMove = (items: FEItemRecord, itemPaths: Record<string, string>, parentId?: string) => Promise<boolean>;

type FERemove = (items: FEItemRecord, itemPaths: Record<string, string>) => Promise<boolean>;

type FECreate = (type: number, name: string, parentId?: string) => Promise<boolean>;

type FEUpload = (files: FEUploadFiles, parentId?: string) => Promise<boolean>;

type FEUploadFiles = {
  files: FileList
  [fileSettingIndex: string]: any
};
