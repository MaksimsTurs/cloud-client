import type { AppDispatch } from "@reducer/store";
import type { UseNotificationToastActionsReturn } from "./use-notification-toast-actions.type";

import { useDispatch } from "react-redux";
import { addToast, markToRemove, removeAllToasts, removeToastById } from "@feature/notification-toast/reducers/notification-toast.slice";

import DELAYS from "@feature/notification-toast/const/DELAYS.const";

export default function useNotificationToastActions(): UseNotificationToastActionsReturn {
  const dispatch = useDispatch<AppDispatch>();

  return {
    removeById: function(id) {
      dispatch(removeToastById(id));
    },
    removeAll: function() {
      dispatch(removeAllToasts())
    },
    add: function(params) {
      const id: string = window.crypto.randomUUID();
      const timerId: number = setTimeout(() => {
        dispatch(markToRemove(id));
      }, DELAYS.TOAST_DISAPPEAR_TIME) as unknown as number;
      
      dispatch(addToast({
        ...params, 
        markTimerId: timerId, 
        id, 
        createdAt: Date.now(), 
        shouldRemoved: false 
      }));
    }
  }
};
