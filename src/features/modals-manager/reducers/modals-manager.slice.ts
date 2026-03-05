import { createSlice } from "@reduxjs/toolkit";

import type { ModalsManagerState, PushModalPayload } from "./modals-manager.type";

export const initState: ModalsManagerState = {
  stack: [],
};

const slice = createSlice({
  name: "modals",
  initialState: initState,
  reducers: {
    pushModal: function(state, action: PushModalPayload): void {
      state.stack.push({ isShowed: true, title: action.payload });
    },
    popModal: function(state): void {
      state.stack.pop();
    }
  }
});

export const { 
  popModal,
  pushModal
} = slice.actions;
export default slice.reducer;
