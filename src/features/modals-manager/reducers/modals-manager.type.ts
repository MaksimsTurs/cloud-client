import type { PayloadAction } from "@reduxjs/toolkit";

export type ModalsManagerState = {
  stack: ModalState[]
};

export type ModalState = {
  isShowed: boolean
  title:    string
};

export type PushModalPayload = PayloadAction<string>;
