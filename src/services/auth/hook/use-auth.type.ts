import type { AuthTokens } from "../components/Auth-Provider/Auth-Provider.type";

export type UseAuthReturn<E = unknown> = {
  isAuthorizing: boolean
  /**
    *  @description Loading state.
    */
  isLoading: boolean
  /**
    *  @description Serialized error that occur while `withAuth` function
    *  execution.
    */
  error?: E
  /**
    *  @description Gives true if user is authorized, to get authorized, the client should
    *  have valid access token, if you loged up you can call `authorize` function that will 
    *  make request to you server to get tokens, otherwise you
    *  should create a new account or log in.
    */
  isAuthorized: boolean
  /**
    @description make request to you server to get access token.
  */
  authorize: UseAuthAuthorize
  /**
    @description make log in/up request to you server, callback should return a 
    access token.
  */
  authenticate: UseAuthAuthenticate
  /**
    @description make log out request to you server and
    remove all local information, server should clear http cookie.
    When user are loged out function return two undefineds, for data and error.
  */
  logout: UseAuthLogout
};

export type UseAuthOptions<E = unknown> = {
  serializeError: SerializeError<E>
};

export type UseAuthEndpointResponse = {
  tokens: AuthTokens
};

// Options

type SerializeError<E = unknown> = (error: unknown) => E;

// Functions

type UseAuthCallback = () => Promise<UseAuthEndpointResponse | undefined>;

type UseAuthAuthorize = (callback: UseAuthCallback) => Promise<boolean>;

type UseAuthLogout = (callback: UseAuthCallback) => Promise<boolean>;

type UseAuthAuthenticate = (callback: UseAuthCallback) => Promise<boolean>;
