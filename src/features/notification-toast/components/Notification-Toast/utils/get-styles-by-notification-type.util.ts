import type { CSSProperties } from "react";

import NOTIFICATION_TOAST_TYPES from "@feature/notification-toast/const/NOTIFICATION-TOAST-TYPES.const";

export default function getStylesByNotificationType(type: number): CSSProperties {
  switch(type) {
    case NOTIFICATION_TOAST_TYPES.ERROR:
      return { backgroundColor: "#500", border: "1px solid #500" };
    case NOTIFICATION_TOAST_TYPES.INFO:
      return { backgroundColor: "#0b0055", border: "1px solid #0b0055" };
    case NOTIFICATION_TOAST_TYPES.WARN:
    default:
      return {};
  }
};
