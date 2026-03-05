import type { ReactRouterContextValue } from "../types/use-react-router.type";
import type { ReactNode, RefObject } from "react";
import type { RoutesProps } from "../types/Routes.type";

import { createContext, useRef, useState } from "react";

export const ReactRouterContext = createContext<ReactRouterContextValue<any> | undefined>(undefined);

export default function Routes<P extends string>({ children }: RoutesProps): ReactNode {
  const [paths, setPath] = useState<P[]>([location.pathname] as P[]);
  const patterns: RefObject<Set<string>> = useRef<Set<string>>(new Set<string>())

  const value: ReactRouterContextValue<P> = { 
    patterns: patterns.current,
    paths,
    pushPath: function(path: P): void {
      setPath(prev => [...prev, path]);
    },
    popPath: function(): void {
      setPath(prev => {
        prev.pop();

        if(!prev.length) {
          return ["/" as P];
        }

        return [...prev];
      });
    },
    addPattern: function(newPattern: string): void {
      if(!patterns.current.has(newPattern)) {
        patterns.current.add(newPattern);
      }
    },
  };
  
  return <ReactRouterContext value={value}>{children}</ReactRouterContext>
};
