import SCallResult from "./SCall-Result.util";

export type AnyCallback = () => never | any;

export type AsyncCallback<R = unknown, E = unknown> = () => Promise<R | SCallResult<R, E>>;

export type SyncCallback<R = unknown, E = unknown> = () => R | SCallResult<R, E>;
