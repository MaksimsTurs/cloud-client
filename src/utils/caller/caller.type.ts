export type CalleeResult<D = unknown, E = unknown> = [D | undefined, E | undefined];

export type CalleeAsync<D = unknown> = () => Promise<D>;

export type CalleeSync<D = unknown> = () => D;
