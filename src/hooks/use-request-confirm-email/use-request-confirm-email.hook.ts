import type { SerializedError } from "@root/global.type";
import type { UseRequestConfirmEmailReturn } from "./use-send-confirm-email.type";

import { useState, useEffect } from "react";

import http from "@util/http/http.util";
import scall from "@util/scall/scall.util";
import serializeError from "@util/serialize-error.util";

export default function useRequestConfirmEmail(): UseRequestConfirmEmailReturn {
  const [error, setError] = useState<SerializedError | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const requestConfirmEmail = async (): Promise<void> => {
      setIsLoading(true);

      const result = await scall<void>(async () => {
        await http.get("/user/request-confirm-email", { credentials: "include" });
      });

      if(result.getError()) {
        setError(await serializeError(result.getError()));
      }
          
      setIsLoading(false);
    };

    requestConfirmEmail();
  }, []);

  return {
    isLoading,
    error
  };
};
