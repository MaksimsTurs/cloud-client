import type { Dispatch, SetStateAction } from "react";

import { useContext } from "react";

import { ReactRouterContext } from "./components/Routes.component";

export default function useSearchParams(): [URLSearchParams, Dispatch<SetStateAction<URLSearchParams>>] {
  const context = useContext(ReactRouterContext);

  return [context!.searchParams, context!.setSearchParams]
};
