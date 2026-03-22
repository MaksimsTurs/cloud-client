import type { CSSProperties } from "react";
import type { NotificationToastTypes } from "@feature/notification-toast/reducers/notification-toast.type";

export default function getStylesByNotificationType(type: NotificationToastTypes): CSSProperties {
  switch(type) {
    case "error":
      return { backgroundColor: "#500", border: "1px solid #500" };
    case "info":
      return { backgroundColor: "#0b0055", border: "1px solid #0b0055" };
    case "warn":
    default:
      return {};
  }
};
