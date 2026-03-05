import type { UseTryDispatchReturn } from "./use-try-dispatch.type";
import type { SerializedError } from "@root/global.type";
import type { AppDispatch } from "@reducer/store";

import caller from "@util/caller/caller.util";
import serializeError from "@util/serialize-error.util";
import refreshUserRefreshToken from "@util/refresh-user-refresh-token.util";

import { useDispatch } from "react-redux";

import { useWithAuth } from "@service/auth/auth.service";
import { useNotificationToastActions } from "@feature/notification-toast/notification-toast.feature";

import NOTIFICATION_TOAST_TYPES from "@feature/notification-toast/const/NOTIFICATION-TOAST-TYPES.const";

export default function useTryDispatch(): UseTryDispatchReturn {
  const dispatch = useDispatch<AppDispatch>();
  const withAuth = useWithAuth<SerializedError>({ serializeError });
  const notificationToast = useNotificationToastActions();

  return {
    syncDispatcher: (action, args) => {
      const [_, error] = caller(() => {
        dispatch(action(args));
      });

      if(error) {
        notificationToast.add({ type: NOTIFICATION_TOAST_TYPES.ERROR, message: serializeError(error).message });
        return false;
      }

      return true;
    },
    asyncDispatcher: async (action, args) => {
      const [_, error] = await withAuth<void>({
        apiRequest: async () => {
          await dispatch(action(args)).unwrap();
        },
        refreshRefreshToken: async () => {
          return await refreshUserRefreshToken();
        }
      });

      if(error) {
        notificationToast.add({ type: NOTIFICATION_TOAST_TYPES.ERROR, message: error.message });
        return false;
      }

      return true;
    }
  };
};
