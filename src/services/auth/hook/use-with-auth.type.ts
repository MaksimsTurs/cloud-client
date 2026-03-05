export type UseWithAuthReturn<E = unknown> = <D = unknown>(callbacks: UseWithAuthCallbacks<D>) => Promise<[D | undefined, E | undefined]>

export type UseWithAuthEndpointResponse = string; 

export type UseWithAuthOptions<E = unknown> = {
  serializeError: SerializeError<E>
};

type SerializeError<E = unknown> = (error: unknown) => E;

export type UseWithAuthCallbacks<D = unknown> = {
  apiRequest: UseWithAuthApiRequest<D>
  refreshRefreshToken: UseWithAuthRefreshRefreshToken
};

export type UseWithAuthApiRequest<D = unknown> = () => Promise<D | undefined>;

export type UseWithAuthRefreshRefreshToken = () => Promise<UseWithAuthEndpointResponse | undefined>;
