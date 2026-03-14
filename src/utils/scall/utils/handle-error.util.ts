import { isInstanceOf } from "@util/is.util";

import SCallResult from "../SCall-Result.util";

export default function handleError<R = unknown, E = unknown>(reason: unknown): SCallResult<R, E> {
  if(isInstanceOf(reason, SCallResult)) {
    return reason as SCallResult<R, E>;
  }

  return new SCallResult<R, E>(undefined, reason as E);
};
