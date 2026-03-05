import type { NotificationToast, NotificationToasterState } from "@feature/notification-toast/reducers/notification-toast.type";
import type { RootState } from "@reducer/store";
import type { UseNotificationToastReturn } from "./use-notification-toast.type";

import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import DELAYS from "@feature/notification-toast/const/DELAYS.const";

export default function useNotificationToast(): UseNotificationToastReturn {
  const { toasts } = useSelector<RootState, NotificationToasterState>(selector => selector.notificationToast);
  const [isRecentlyAdded, setIsRecentlyAdded] = useState<boolean>(false);
  const [isListHovered, setIsListHovered] = useState<boolean>(false);

  useEffect(() => {
    const timerId: number = setTimeout(() => {
      setIsRecentlyAdded(false);
    }, DELAYS.TOAST_COLAPSE_TIME) as unknown as number;

    return () => {
      clearTimeout(timerId);
    }
  }, [toasts])

  return {
    isRecentlyAdded,
    isListHovered,
    setIsListHovered,
    toasts: Object.values(toasts).filter(Boolean) as NotificationToast[]
  };
};
