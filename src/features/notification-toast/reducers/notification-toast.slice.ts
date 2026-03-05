import type { WritableDraft } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

import type { 
  AddToastPayloadAction, 
  MarkToRemovePayloadAction,
  RemoveToastByIdPayloadAction,

  NotificationToasterState, 
  NotificationToast
} from "./notification-toast.type";

const initialState: NotificationToasterState = {
  toasts: {},
};

const slice = createSlice({
  name: "notification-toaster",
  initialState,
  reducers: {
    addToast: function(state: WritableDraft<NotificationToasterState>, action: AddToastPayloadAction): void {
      state.toasts[action.payload.id] = action.payload;
    },
    removeAllToasts: function(state: WritableDraft<NotificationToasterState>): void {
      for(let id in state.toasts) {
        const toast: NotificationToast | undefined = state.toasts[id];

        if(toast && toast.shouldRemoved) {
          clearTimeout(toast.markTimerId);
          state.toasts[id] = undefined;
        }
      }
    },
    removeToastById: function(state: WritableDraft<NotificationToasterState>, action: RemoveToastByIdPayloadAction): void {
      clearTimeout(state.toasts[action.payload]?.markTimerId);
      state.toasts[action.payload] = undefined;
    },
    markToRemove: function(state: WritableDraft<NotificationToasterState>, action: MarkToRemovePayloadAction): void {
      const toast: NotificationToast | undefined = state.toasts[action.payload];

      if(toast) {
        state.toasts[action.payload] = {...toast, shouldRemoved: true };
      }
    }
  }
});

export default slice.reducer;
export const {
  addToast,
  removeToastById,
  removeAllToasts,
  markToRemove,
} = slice.actions;
