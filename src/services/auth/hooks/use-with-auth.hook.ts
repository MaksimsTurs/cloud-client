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
import scall from "@util/scall/scall.util";
import SCallResult from "@util/scall/SCall-Result.util";

export default function useWithAuth<E extends { code?: number }>(options: UseWithAuthOptions<E>): UseWithAuthReturn<E> {
  const context: AuthContextValue | undefined = useContext<AuthContextValue | undefined>(AuthContext);

  if(!context) {
    throw new Error("Wrap you'r application into AuthProvider compontent!");
  }

  const makeApiRequest = async <D = unknown>(apiRequest: UseWithAuthApiRequest<D>): Promise<SCallResult<D, unknown>> => {
    return await scall<D, unknown>(async () => {
      return await apiRequest();
    });
  };

  return async function<D = unknown>(callbacks: UseWithAuthCallbacks<D>) {
    let serializedError: E | undefined;

    const { apiRequest, generateRefreshToken } = callbacks;

    // First try to access user api endpoint.
    const firstTryResult = await makeApiRequest<D>(apiRequest);
      
    if(!firstTryResult.getError()) {
      return new SCallResult<D, E>(firstTryResult.getData(), options.serializeError(firstTryResult.getError()));
    }

    serializedError = options.serializeError(firstTryResult.getError());

    if(serializedError.code != 401) {
      return new SCallResult<D, E>(undefined, serializedError);
    }

    // Refresh the refresh token.
    const refreshTokenResult = await scall<UseWithAuthEndpointResponse | undefined, unknown>(async () => {
      const newToken: unknown = await generateRefreshToken();

      if(!isString(newToken)) {
        throw new Error("The refresh token is not of type string!");
      }

      return newToken;
    });

    if(refreshTokenResult.getError()) {
      serializedError = options.serializeError(refreshTokenResult.getError());
      return new SCallResult<D, E>(undefined, serializedError);
    }

    context?.setTokens(prev => ({...prev, refresh: refreshTokenResult.getData() }));

    // Last try to access user api endpoint.
    const lastTryResult = await makeApiRequest<D>(apiRequest); 

    if(lastTryResult.getError()) {
      serializedError = options.serializeError(lastTryResult.getError());
      return new SCallResult<D, E>(undefined, serializedError);
    }

    return lastTryResult as SCallResult<D, E>;
  };
};
