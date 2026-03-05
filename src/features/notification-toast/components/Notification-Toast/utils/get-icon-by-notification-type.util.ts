import NOTIFICATION_TOAST_TYPES from "@feature/notification-toast/const/NOTIFICATION-TOAST-TYPES.const";

import { AlertCircleIcon, AlertOctagonIcon, TriangleAlertIcon } from "lucide-react";

export default function getIconByNotificationType(type: number) {
  switch(type) {
    case NOTIFICATION_TOAST_TYPES.ERROR:
      return AlertOctagonIcon;
    case NOTIFICATION_TOAST_TYPES.INFO:
      return AlertCircleIcon;
    case NOTIFICATION_TOAST_TYPES.WARN:
      return TriangleAlertIcon;
    default:
      return null; 
  }
};
