import type { CalleeAsync, CalleeSync, CalleeResult } from "./caller.type";

import { isFunction } from "@util/is.util";

export default function caller<D = unknown, E = unknown>(callback: CalleeAsync<D>): Promise<CalleeResult<D, E>>;
export default function caller<D = unknown, E = unknown>(callback: CalleeSync<D>): CalleeResult<D, E>;
export default function caller<D = unknown, E = unknown>(callback: CalleeAsync<D> | CalleeSync<D>): Promise<CalleeResult<D, E>> | CalleeResult<D, E> {
  if(isFunction(callback)) {
    const tag: string = callback[Symbol.toStringTag as keyof typeof callback]
    
    let data: any;

    try {
      if(tag === "AsyncFunction") {
        const _callback: CalleeAsync<D> = callback as CalleeAsync<D>;

        return new Promise<CalleeResult<D, E>>((resolve) => {
          _callback()
            .then(data => {
              resolve([data, undefined]);
            })
            .catch(reason => {
              resolve([undefined, reason]);
            });
        });
      } else {
        data = callback();
      }

      return [data, undefined];
    } catch(error) {
      return [undefined, error as E];
    }
  }

  throw new TypeError("callback is not of type function!");
};
