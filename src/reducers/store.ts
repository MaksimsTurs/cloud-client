import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import fileExplorer from "@feature/file-explorer/reducers/file-explorer/file-explorer.slice";
import notificationToast from "@feature/notification-toast/reducers/notification-toast.slice";
import modalsManager from "@feature/modals-manager/reducers/modals-manager.slice";

const reducers = combineReducers({
  fileExplorer,
  notificationToast,
  modalsManager
});

const store = configureStore({ 
  reducer: reducers,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
