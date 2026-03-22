import type { NotificationToastTypes } from "@feature/notification-toast/reducers/notification-toast.type";

import { AlertCircleIcon, AlertOctagonIcon, TriangleAlertIcon } from "lucide-react";

export default function getIconByNotificationType(type: NotificationToastTypes) {
  switch(type) {
    case "error":
      return AlertOctagonIcon;
    case "info":
      return AlertCircleIcon;
    case "warn":
      return TriangleAlertIcon;
    default:
      return null; 
  }
};
