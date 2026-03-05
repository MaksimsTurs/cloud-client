import type { PayloadAction } from "@reduxjs/toolkit";

export type NotificationToasterState = {
  toasts: Record<string, NotificationToast | undefined>
};

export type NotificationToast = {
  id: string
  markTimerId: number
  type: number
  message: string
  createdAt: number
  shouldRemoved: boolean
};

export type AddToastPayloadAction = PayloadAction<NotificationToast>;

export type RemoveToastByIdPayloadAction = PayloadAction<string>;

export type MarkToRemovePayloadAction = PayloadAction<string>;
