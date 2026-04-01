import type { SerializedError } from "@root/global.type";
import type { UseSendConfirmEmailReturn } from "./use-send-confirm-email.type";

import { useState, useEffect } from "react";

import { useNavigate } from "../use-react-router/use-react-router.hook";

import http from "@util/http/http.util";
import scall from "@util/scall/scall.util";
import serializeError from "@util/serialize-error.util";

export default function useSendConfirmEmail(): UseSendConfirmEmailReturn {
  const [error, setError] = useState<SerializedError | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const requestConfirmEmail = async (): Promise<void> => {
      setIsLoading(true);

      const result = await scall<void>(async () => {
        await http.get("/user/request-confirm-email", { credentials: "include" });
      });

      if(result.getError()) {
        const error: SerializedError = await serializeError(result.getError());
        
        if(error.code === 403) {
          navigate("/");
        } else {
          setError(error);
        }
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
