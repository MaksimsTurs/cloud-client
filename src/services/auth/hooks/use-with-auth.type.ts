import SCallResult from "@util/scall/SCall-Result.util";

export type UseWithAuthReturn<E = unknown> = <D = unknown>(callbacks: UseWithAuthCallbacks<D>) => Promise<SCallResult<D, E>>

export type UseWithAuthEndpointResponse = string; 

export type UseWithAuthOptions<E = unknown> = {
  serializeError: SerializeError<E>
};

type SerializeError<E = unknown> = (error: unknown) => E;

export type UseWithAuthCallbacks<D = unknown> = {
  apiRequest: UseWithAuthApiRequest<D>
  generateRefreshToken: UseWithAuthGenerateRefreshToken
};

export type UseWithAuthApiRequest<D = unknown> = () => Promise<D>;

export type UseWithAuthGenerateRefreshToken = () => Promise<UseWithAuthEndpointResponse | undefined>;
