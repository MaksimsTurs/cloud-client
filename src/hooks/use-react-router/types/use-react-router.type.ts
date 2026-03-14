import { Dispatch, SetStateAction } from "react";

export type ReactRouterContextValue<P extends string> = {
  paths: P[]
  patterns: Set<string>
  searchParams: URLSearchParams
  setSearchParams: Dispatch<SetStateAction<URLSearchParams>>
  pushPath: ReactRouterPushPath<P>
  popPath: ReactRouterPopPath
  addPattern: ReactRouterAddPathPattern;
};

type ReactRouterAddPathPattern = (pattern: string) => void;

type ReactRouterPushPath<P extends string> = (path: P) => void;

type ReactRouterPopPath = () => void;
