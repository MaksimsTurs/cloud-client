import type { CSSProperties, ReactNode } from "react";

import scss from "./Notification-Toast-Renderer.module.scss";

import NotificationToast from "./components/Notification-Toast.component";

import useNotificationToast from "@feature/notification-toast/hooks/use-notification-toast.hook";

export default function NotificationToastRenderer(): ReactNode {
  const { toasts, setIsListHovered, isRecentlyAdded, isListHovered } = useNotificationToast();
  const styles: CSSProperties = { height: isListHovered ? "auto" : "0rem" };

  return(
    <ul 
      className={scss.notification_toast_list}
      onMouseEnter={() => setIsListHovered(true)}
      onMouseLeave={() => setIsListHovered(false)}
      style={styles}>
      {toasts.map((toast, index: number) => 
        <NotificationToast 
          {...toast } 
          index={(isRecentlyAdded || isListHovered) ? 0 : index}
          key={index}/>
      )}
    </ul>
  );
};

