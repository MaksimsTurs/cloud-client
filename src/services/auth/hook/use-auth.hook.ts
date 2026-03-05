import type { AuthContextValue } from "../components/Auth-Provider/Auth-Provider.type";
import type { UseAuthEndpointResponse, UseAuthOptions, UseAuthReturn } from "./use-auth.type";

import { AuthContext } from "../components/Auth-Provider/Auth-Provider.component";

import { useContext, useState } from "react";

import AuthenticationError from "../utils/Authentication-Error.util";
import caller from "@util/caller/caller.util";
import { isUndefined } from "@util/is.util";
import { inObject } from "@util/std/std.util";

export default function useAuth<E = undefined>(options: UseAuthOptions<E>): UseAuthReturn<E> {
  const context = useContext<AuthContextValue | undefined>(AuthContext);
  const [error, setError] = useState<E | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if(!context) {
    throw new Error("Wrap you'r application into AuthProvider compontent!");
  }

  const handleError = (error: unknown): E => {
    const serializedError: E = options.serializeError(error);

    setError(serializedError);
    setIsLoading(false);

    return serializedError;
  };

  return {
    isLoading,
    error,
    isAuthorizing: context.isAuthorizing,    
    isAuthorized: !isUndefined(context?.tokens.access),
    authorize: async function(callback) {
      let serializedError: E | undefined;

      context.setIsAuthorizing(true);

      const [data, error] = await caller<UseAuthEndpointResponse, E | undefined>(async() => {
        const response = await callback();

        if(!response || !inObject(["access", "refresh"], response.tokens || {})) {
          throw new AuthenticationError("Refresh and Access tokens must be returned from you authentication endpoint!");
        }

        return response;
      });

      if(error) {
        serializedError = handleError(error);
        context.setIsAuthorizing(false);
        context.setHasAuthorized(true);
        return serializedError;
      } 

      context.setTokens(data!.tokens);
      context.setIsAuthorizing(false);
      context.setHasAuthorized(true);

      return undefined;
    },
    logout: async function(callback) {
      let serializedError: E | undefined;

      if(context.tokens) {
        setIsLoading(true);
        setError(undefined);

        const [_, error] = await caller<void, E>(async () => {
          await callback();
        });
      
        if(error) {
          serializedError = handleError(error);
          return serializedError;
        }

        context.setTokens({});

        setError(undefined);
        setIsLoading(false);

        return undefined;
      }

      return undefined;
    },
    authenticate: async function(callback) {
      let serializedError: E | undefined;

      setIsLoading(true);
      setError(undefined);

      const [data, error] = (await caller<UseAuthEndpointResponse, unknown>(async () => {
        const response = await callback();

        if(!response || !inObject(["access", "refresh"], response.tokens || {})) {
          throw new AuthenticationError("Refresh and Access tokens must be returned from you authentication endpoint!");
        }

        return response;
      }))

      if(error) {
        serializedError = handleError(error);
        return serializedError;
      }

      context?.setTokens(data!.tokens);
      setIsLoading(false);
      setError(undefined);

      return undefined;
    },
  };
};
