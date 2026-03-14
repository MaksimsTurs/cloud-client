import SCallResult from "./SCall-Result.util";

import type { AsyncCallback, SyncCallback } from "./scall.type";

import { isAsync } from "./utils/is.util";
import { isFunction } from "@util/is.util";
import handleSuccess from "./utils/handle-success.util";
import handleError from "./utils/handle-error.util";

export default function scall<R = unknown, E = unknown>(callback: SyncCallback<R, E>): SCallResult<R, E>
export default function scall<R = unknown, E = unknown>(callback: AsyncCallback<R, E>): Promise<SCallResult<R, E>>
export default function scall<R = unknown, E = unknown>(callback: unknown): unknown {
  if(isFunction(callback)) {
    if(isAsync(callback)) {
      return new Promise<SCallResult<R, E>>(resolve => {
        const _callback = callback as AsyncCallback<R, E>;
        _callback()
          .then(data => resolve(handleSuccess<R, E>(data)))
          .catch(reason => resolve(handleError<R, E>(reason)));
      });
    }

    try {
      return handleSuccess<R, E>(callback());
    } catch(error) {
      return handleError<R, E>(error);
    }
  }

  throw new TypeError("callback is no of type function!");
};
