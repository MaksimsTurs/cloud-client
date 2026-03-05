import type { InitRouteComponentsReturn } from "./init-route-components.type";

import Link from "./components/Link.component";
import Route from "./components/Route.component";

export default function initRouteComponents<P extends string>(): InitRouteComponentsReturn<P> { 
  return {
    Link: Link<P>,
    Route: Route<P>
  };
};