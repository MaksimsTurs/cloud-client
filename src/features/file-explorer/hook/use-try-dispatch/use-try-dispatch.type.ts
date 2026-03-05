import type { AsyncThunkAction, AsyncThunkConfig, AsyncThunkDispatchConfig } from "@reduxjs/toolkit";

export type UseTryDispatchReturn = {
  syncDispatcher: TrySyncDispatcher
  asyncDispatcher: TryAsyncDispatcher
};

type TrySyncDispatcher = <P = any, T extends string = string>(action: SyncReducerAction<P, T>, args: P) => boolean

type TryAsyncDispatcher = <R = any, P = any>(action: AsyncReducerAction<R, P>, args: P) => Promise<boolean>;

type SyncReducerAction<P, T extends string = string> = (payload: P) => { payload: P, type: T };

type AsyncReducerAction<R = any, P = any> = (arg: P, config?: AsyncThunkDispatchConfig) => AsyncThunkAction<R, P, AsyncThunkConfig>
