import type { NotificationToast } from "@feature/notification-toast/reducers/notification-toast.type";
import type { Dispatch, SetStateAction } from "react";

export type UseNotificationToastReturn = {
  isRecentlyAdded: boolean
  isListHovered: boolean
  setIsListHovered: Dispatch<SetStateAction<boolean>>
  toasts: NotificationToast[]
};
