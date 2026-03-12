import type { ReactNode } from "react";
import type { UseAuthEndpointResponse } from "../../hooks/use-auth.type";
import type { AuthRoute } from "./Auth-Route.type";

import { useContext, useEffect } from "react";

import { isFunction, isString, isUndefined } from "@util/is.util";
import scall from "@util/scall/scall.util";

import { AuthContext } from "../Auth-Provider/Auth-Provider.component";

import AuthenticationError from "../../utils/Authentication-Error.util";

export default function AuthRoute({ authorize, children }: AuthRoute): ReactNode {
  const context = useContext(AuthContext);

  if(!context) {
    throw new Error("Wrap you'r application into AuthProvider compontent!");
  }

  useEffect(() => {
    const _onEnter = async (): Promise<void> => {
      context.setIsAuthorizing(true);

      const result = await scall<UseAuthEndpointResponse>(async () => {
        const response: UseAuthEndpointResponse | undefined = await authorize!();
      
        if(!response || 
           !isString(response.tokens.access) || 
           !isString(response.tokens.refresh)) {
          throw new AuthenticationError("Refresh and Access tokens must be returned from you authentication endpoint!");
        }
        
        return response;
      });

      context.setTokens(result.getData()?.tokens || {});
      context.setIsAuthorizing(false);
    };

    if(!isUndefined(authorize) && !isFunction(authorize)) {
      throw new Error("onEnter is not of type function!");
    }

    _onEnter();
  }, []);

  return children;
};
