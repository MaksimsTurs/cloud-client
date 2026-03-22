export type KeyOf<T = any> = keyof T;

export type VoidFunction = () => void;

export type Constructable = abstract new(...args: any) => any;

export type SerializedError = {
  code?: number
  message: string
};

export type User = {
  is_verified: boolean
};
