import type { NotificationToast } from "@feature/notification-toast/reducers/notification-toast.type";

export type UseNotificationToastActionsReturn = {
  removeAll: ActionRemoveAll
  removeById: ActionRemoveById
  add: ActionAdd
};

type ActionRemoveById = (id: string) => void;

type ActionRemoveAll = () => void;

type ActionAdd = (toast: ActionAddParams) => void;

type ActionAddParams = Omit<NotificationToast, "createdAt" | "id" | "markTimerId" | "shouldRemoved">;
