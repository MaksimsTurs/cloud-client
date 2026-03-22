import type { NotificationToastTypes } from "../reducers/notification-toast.type";

export type UseNotificationToastActionsReturn = {
  removeAll: ActionRemoveAll
  removeById: ActionRemoveById
  add: ActionAdd
};

type ActionRemoveById = (id: string) => void;

type ActionRemoveAll = () => void;

type ActionAdd = (type: NotificationToastTypes, message: string) => void;
