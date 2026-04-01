import type { UseTryDispatchReturn } from "./use-try-dispatch.type";
import type { SerializedError } from "@root/global.type";
import type { AppDispatch } from "@reducer/store";

import scall from "@util/scall/scall.util";
import serializeErrorSync from "@util/serialize-error-sync.util";
import serializeError from "@root/utils/serialize-error.util";
import generateRefreshToken from "@util/generate-refresh-token.util";

import { useDispatch } from "react-redux";

import { useWithAuth } from "@service/auth/auth.service";
import { useNotificationToastActions } from "@feature/notification-toast/notification-toast.feature";

export default function useTryDispatch(): UseTryDispatchReturn {
  const dispatch = useDispatch<AppDispatch>();
  const withAuth = useWithAuth<SerializedError>({ serializeError });
  const notificationToast = useNotificationToastActions();

  return {
    syncDispatcher: (action, args) => {
      const result = scall(() => {
        dispatch(action(args));
      });

      if(result.getError()) {
        notificationToast.add("error", serializeErrorSync(result.getError()).message);
        return false;
      }

      return true;
    },
    asyncDispatcher: async (action, args) => {
      const result = await withAuth<void>({
        generateRefreshToken,
        apiRequest: async () => {
          await dispatch(action(args)).unwrap();
        },
      });

      if(result.getError()) {
        notificationToast.add("error", result.getError()!.message);
        return false;
      }

      return true;
    }
  };
};
