import type { MouseEvent, ReactNode } from "react";
import type { ReactRouterContextValue } from "../types/use-react-router.type";
import type { LinkProps } from "../types/Link.type";

import { ReactRouterContext } from "./Routes.component";

import { useContext } from "react";

export default function Link<P extends string>({ children, ...attributes }: LinkProps<P>): ReactNode {
  const context: ReactRouterContextValue<any> | undefined = useContext(ReactRouterContext);

  if(!context) {
    throw new Error("Link component should be wrapped into Routes component!");
  }

  const changePath = (event: MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();

    history.pushState(null, "", attributes.href);
    context.pushPath(attributes.href);
  };

  return <a {...attributes} onClick={changePath}>{children}</a>;
};