import type { AuthContextValue } from "../components/Auth-Provider/Auth-Provider.type";
import type { UseAuthEndpointResponse, UseAuthOptions, UseAuthReturn } from "./use-auth.type";

import { AuthContext } from "../components/Auth-Provider/Auth-Provider.component";

import { useContext, useState } from "react";

import AuthenticationError from "../utils/Authentication-Error.util";

import scall from "@util/scall/scall.util";
import { isString, isUndefined } from "@util/is.util";

export default function useAuth<E = undefined>(options: UseAuthOptions<E>): UseAuthReturn<E> {
  const context = useContext<AuthContextValue | undefined>(AuthContext);
  const [error, setError] = useState<E | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if(!context) {
    throw new Error("Wrap you'r application into AuthProvider compontent!");
  }

  const handleFail = (error: unknown): void => {
    const serializedError: E = options.serializeError(error);

    setError(serializedError);
    setIsLoading(false);
  };

  return {
    isAuthorizing: context.isAuthorizing,    
    isAuthorized: !isUndefined(context?.tokens.access),
    isLoading,
    error,
    authorize: async function(callback) {
      context.setIsAuthorizing(true);

      const result = await scall<UseAuthEndpointResponse, E | undefined>(async() => {
        const response = await callback();

        if(!response || 
           !isString(response.tokens.access) || 
           !isString(response.tokens.refresh)) {
          throw new AuthenticationError("Refresh and Access tokens must be returned from you authentication endpoint!");
        }

        return response;
      });

      if(result.getError()) {
        handleFail(result.getError());
        context.setIsAuthorizing(false);
        return false;
      } 

      context.setTokens(result.getData()!.tokens);
      context.setIsAuthorizing(false);

      return true;
    },
    authenticate: async function(callback) {
      setIsLoading(true);
      setError(undefined);

      const result = await scall<UseAuthEndpointResponse, E | undefined>(async() => {
        const response = await callback();

        if(!response || 
           !isString(response.tokens.access) || 
           !isString(response.tokens.refresh)) {
          throw new AuthenticationError("Refresh and Access tokens must be returned from you authentication endpoint!");
        }

        return response;
      });

      if(result.getError()) {
        handleFail(result.getError());
        return false;
      }

      context?.setTokens(result.getData()!.tokens);
      setIsLoading(false);
      setError(undefined);

      return true;
    },
    logout: async function(callback) {
      if(context.tokens) {
        setIsLoading(true);
        setError(undefined);

        const result = await scall<void, E>(async () => {
          await callback();
        });
      
        if(result.getError()) {
          handleFail(result.getError());
          return false;
        }

        context.setTokens({});

        setError(undefined);
        setIsLoading(false);

        return true;
      }

      return true;
    },
  };
};
