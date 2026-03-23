import type { SerializedError } from "@root/global.type";
import type { FEItemPreivew } from "@page/File-Viewer/Page.type";
import type { UseFileExplorerGetFile } from "./use-file-explorer-get-file.type";

import { useEffect, useState } from "react";

import { isUndefined, isNull } from "@util/is.util";
import serializeError from "@util/serialize-error.util";
import generateRefreshToken from "@util/generate-refresh-token.util";
import http from "@util/http/http.util";

import { useWithAuth } from "@service/auth/auth.service";

import { useNotificationToastActions } from "@feature/notification-toast/notification-toast.feature";

export default function useFileExplorerGetFile(id?: string): UseFileExplorerGetFile {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isExist, setIsExist] = useState(!isUndefined(id) || !isNull(id));
  const [data, setData] = useState<FEItemPreivew | undefined>(undefined);
  const withAuth = useWithAuth<SerializedError>({ serializeError });
  const notificationToast = useNotificationToastActions();

  useEffect(() => {
    const getFile = async (): Promise<void> => {
      setIsLoading(true);
  
      const result = await withAuth<FEItemPreivew>({
        generateRefreshToken,
        apiRequest: async () => {
          return await http.get<FEItemPreivew>(`/storage/get/${id}`, { credentials: "include" });
        }
      });

      if(result.getError()) {
        notificationToast.add("error", (await serializeError(result.getError())).message);
        setIsExist(false);
      } else {
        setData(result.getData());
      }

      setIsLoading(false);
    };

    if(!isNull(id) || !isUndefined(id)) {
      getFile();
    }
  }, []);

  return {
    isLoading,
    isExist,
    data
  };
};
