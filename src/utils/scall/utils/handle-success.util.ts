import { isInstanceOf } from "@util/is.util";

import SCallResult from "../SCall-Result.util";

export default function handleSuccess<R = unknown, E = unknown>(data: R | SCallResult<R, E>): SCallResult<R, E> {
  if(isInstanceOf(data, SCallResult)) {
    return data as SCallResult<R, E>;
  }

  return new SCallResult<R, E>(data as R, undefined);
};
