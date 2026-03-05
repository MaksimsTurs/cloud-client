import type { 
  UseWithAuthApiRequest,
  UseWithAuthCallbacks,
  UseWithAuthEndpointResponse, 
  UseWithAuthOptions,
  UseWithAuthReturn,
} from "./use-with-auth.type";
import type { AuthContextValue } from "../components/Auth-Provider/Auth-Provider.type";

import { AuthContext } from "../components/Auth-Provider/Auth-Provider.component";

import { useContext } from "react";

import { isString } from "@util/is.util";
import caller from "@util/caller/caller.util";

export default function useWithAuth<E extends { code?: number }>(options: UseWithAuthOptions<E>): UseWithAuthReturn<E> {
  const context = useContext<AuthContextValue | undefined>(AuthContext);

  if(!context) {
    throw new Error("Wrap you'r application into AuthProvider compontent!");
  }

  const makeApiRequest = async <D = unknown>(apiRequest: UseWithAuthApiRequest<D>): Promise<[D | undefined, unknown]> => {
    return await caller<D | undefined, unknown>(async () => {
      return await apiRequest();
    });
  };

  return async function<D = unknown>(callbacks: UseWithAuthCallbacks<D>): Promise<[D | undefined, E | undefined]> {
    let serializedError: E | undefined;

    const { apiRequest, refreshRefreshToken } = callbacks;

    // First try to access user api endpoint.
    const [firstTryData, firstTryError] = await makeApiRequest<D>(apiRequest);
      
    if(!firstTryError) {
      return [firstTryData, undefined];
    }

    serializedError = options.serializeError(firstTryError);

    if(serializedError.code != 401) {
      return [undefined, serializedError];
    }

    // Refresh the refresh token.
    const [refreshToken, getRefreshTokenError] = await caller<UseWithAuthEndpointResponse | undefined, unknown>(async () => {
      const newToken: unknown = await refreshRefreshToken();

      if(!isString(newToken)) {
        throw new TypeError("The refresh token is not of type string!");
      }

      return newToken;
    });

    if(getRefreshTokenError) {
      serializedError = options.serializeError(getRefreshTokenError);
      return [undefined, serializedError];
    }

    context?.setTokens(prev => ({...prev, refresh: refreshToken }));

    // Last try to access user api endpoint.
    const [lastTryData, lastTryError] = await makeApiRequest<D>(apiRequest); 

    if(lastTryError) {
      serializedError = options.serializeError(lastTryError);
      return [undefined, serializedError];
    }

    return [lastTryData, undefined];
  };
};
