import { createAsyncThunk } from "@reduxjs/toolkit";

import http from "@util/http/http.util";

import type { FERemoveItemsReturn, FERemoveItemsParams } from "../file-explorer.type";

export default createAsyncThunk<FERemoveItemsReturn, FERemoveItemsParams>(
  "fe::remove::items",
  async function(params, thunkApi) {
    try {
      await http.post<void>("/storage/remove", { body: params.items, credentials: "include" });
      return params.itemPaths;
    } catch(error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
