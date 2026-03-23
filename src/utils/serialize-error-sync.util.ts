import type { SerializedError } from "@root/global.type";

import { isInstanceOf } from "./is.util";

export default function serializeErrorSync(error: unknown): SerializedError {
  if(isInstanceOf(error, Error)) {
    return { message: error.message };
  }

  return { message: "Unknown client error!" };
};
