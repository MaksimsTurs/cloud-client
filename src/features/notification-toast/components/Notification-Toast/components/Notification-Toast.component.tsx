import type { CSSProperties, ReactNode } from "react";
import type { NotificationToastProps } from "../Notification-Toast-Renderer.type";

import { XIcon } from "lucide-react";
import { useEffect, useState } from "react";

import scss from "../scss/Notification-Toast.module.scss";

import useNotificationToastActions from "@feature/notification-toast/hooks/use-notification-toast-actions.hook";

import getIconByNotificationType from "../utils/get-icon-by-notification-type.util";
import getStylesByNotificationType from "../utils/get-styles-by-notification-type.util";

import DELAYS from "@feature/notification-toast/const/DELAYS.const";

export default function NotificationToast({ id, shouldRemoved, type, createdAt, message, index }: NotificationToastProps): ReactNode {
  const [currentMs, setCurrentMs] = useState<number>(Date.now());
  const notificationToast = useNotificationToastActions();
  const NotificationIcon = getIconByNotificationType(type);
  const multiplyer: number = (1 - (((createdAt + DELAYS.TOAST_DISAPPEAR_TIME - currentMs)) / DELAYS.TOAST_DISAPPEAR_TIME)) * 100;
  const timeLine: number = multiplyer > 100 ? 100 : multiplyer;
  const styles: CSSProperties = {
    ...getStylesByNotificationType(type),
    bottom: `-${(56 * index) + -(12 * index)}px`,
    zIndex: -index
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setCurrentMs(Date.now());
    }, 16.6) as unknown as number;
 
    return () => {
      clearTimeout(timerId);
    };
  }, [currentMs]);

  return(
    <li 
      style={styles} 
      className={`${shouldRemoved ? scss.notification_toast_remove_animation : ""} ${scss.notification_toast_item}`}
      onAnimationEnd={() => notificationToast.removeAll()}>
      <div className={scss.notification_toast_message}>
        {NotificationIcon && <NotificationIcon strokeWidth={1.5} size={25}/>}
        <p>{message}</p>
      </div>
      <button 
        style={{ color: styles.color }} 
        onClick={() => notificationToast.removeById(id)}
        className={scss.notification_close_button}>
        <XIcon strokeWidth={2} size={15}/>
      </button>
      <div 
        className={scss.notification_timeline}
        style={{ backgroundColor: styles.color, width: `${timeLine}%` }}>  
      </div>
    </li>
  );
};
