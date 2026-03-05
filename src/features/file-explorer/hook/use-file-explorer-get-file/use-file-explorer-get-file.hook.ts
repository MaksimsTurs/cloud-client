import type { SerializedError } from "@root/global.type";
import type { FEItem } from "../../reducers/file-explorer/file-explorer.type";

import { useEffect, useState } from "react";

import { isUndefined, isNull } from "@util/is.util";
import serializeError from "@util/serialize-error.util";
import refreshUserRefreshToken from "@util/refresh-user-refresh-token.util";
import fetcher from "@util/fetcher/fetcher.util";

import { useWithAuth } from "@service/auth/auth.service";

import { useNotificationToastActions } from "@feature/notification-toast/notification-toast.feature";

import NOTIFICATION_TOAST_TYPES from "@feature/notification-toast/const/NOTIFICATION-TOAST-TYPES.const";

export default function useFileExplorerGetFile(id?: string) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isExist, setIsExist] = useState(!isUndefined(id) && !isNull(id));
  const [data, setData] = useState<FEItem & { buffer: string } | undefined>(undefined);
  const withAuth = useWithAuth<SerializedError>({ serializeError });
  const notificationToast = useNotificationToastActions();

  useEffect(() => {
    const getFile = async (): Promise<void> => {
      setIsLoading(true);
  
      const [response, error] = await withAuth<FEItem & { buffer: string }>({
        refreshRefreshToken: async () => {
          return await refreshUserRefreshToken()
        },
        apiRequest: async () => {
          const { data, error } = await fetcher.get<FEItem & { buffer: string }>(`/storage/get/${id}`, { credentials: "include" });

          if(error) {
            throw error;
          }

          return data;
        }
      });

      if(error) {
        notificationToast.add({ type: NOTIFICATION_TOAST_TYPES.ERROR, message: error.message });
        setIsExist(false);
      } else {
        setData(response);
      }

      setIsLoading(false);
    };

    if(!isNull(id) && !isUndefined(id)) {
      getFile();
    }
  }, []);

  return {
    isLoading,
    isExist,
    data
  };
};
