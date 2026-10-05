import type { ReactNode } from "react";
import type { UseAuthEndpointResponse } from "../../hooks/use-auth.type";
import type { AuthRouteProps } from "./Auth-Route.type";
import type { AuthContextValue } from "../Auth-Provider/Auth-Provider.type";
import type { SerializedError } from "@root/global.type";

import { useContext, useEffect } from "react";

import { useWithAuth } from "../../auth.service";

import { isUndefined } from "@util/is.util";
import serializeError from "@util/serialize-error.util";

import { AuthContext } from "../Auth-Provider/Auth-Provider.component";

import AuthenticationError from "../../utils/Authentication-Error.util";

export default function AuthRoute({ auth, generateRefreshToken, children, fallback, loader }: AuthRouteProps): ReactNode {
  const context: AuthContextValue | undefined = useContext<AuthContextValue | undefined>(AuthContext);
  const withAuth = useWithAuth<SerializedError>({ serializeError });

  if(isUndefined(context)) {
    throw new TypeError("Wrap you'r application into AuthProvider compontent!");
  }

  useEffect(() => {
    const _auth = async (): Promise<void> => {
      context.setIsAuthorizing(true);

      const result = await withAuth<UseAuthEndpointResponse>({
        generateRefreshToken,
        apiRequest: async () => {
          const response: UseAuthEndpointResponse | undefined = await auth!();
      
          if(!response?.tokens?.access || !response?.tokens?.refresh) {
            throw new AuthenticationError("Refresh and Access tokens must be returned from you authentication endpoint!");
          }

          return response;
        }
      });

      if(result.getData()) {
        const { tokens, user } = result.getData()!;
            
        context.setTokens(tokens || {});
        context.setUser(user);
      }
      
      context.setIsAuthorizing(false);
    };

    if(!context.user) {
      _auth();
    }
  }, []);

  if(!context.isAuthorizing && !context.user && !context.tokens.access && !context.tokens.refresh) {
    return fallback;
  }

  if(context.isAuthorizing) {
    return loader;
  }

  return children;
};
