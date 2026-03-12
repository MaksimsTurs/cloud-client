import type { AuthTokens } from "../components/Auth-Provider/Auth-Provider.type";

export type UseAuthReturn<E = unknown> = {
  /**
    * @description indicator if the user is authorized, returning a true if both access and refresh tokens are defined.
    */
  isAuthorized: boolean
  /**
    * @description indicator if the authorization is running.
    */
  isAuthorizing: boolean
  /**
    * @description indicator for local loading state.
    */
  isLoading: boolean
  /**
    * @description serialized error.
    */
  error?: E
  /**
    * @description make initial request to you server to get access and refresh tokens.
    */
  authorize: Authorize
  /**
    * @description make log in or log up request to you server to get access and refresh tokens.
    */
  authenticate: Authenticate
  /**
    * @description make log out request to you server and remove all local information, server should clear http cookies.
    */
  logout: Logout
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

type AuthCallback = () => Promise<UseAuthEndpointResponse | undefined>;

type Authorize = (callback: AuthCallback) => Promise<boolean>;

type Logout = (callback: AuthCallback) => Promise<boolean>;

type Authenticate = (callback: AuthCallback) => Promise<boolean>;
