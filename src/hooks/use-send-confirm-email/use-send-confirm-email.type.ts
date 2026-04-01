import type { SerializedError } from "@root/global.type";

export type UseSendConfirmEmailReturn = {
  error?: SerializedError
  isLoading: boolean
};
