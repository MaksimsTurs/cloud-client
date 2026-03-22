import { createAsyncThunk } from "@reduxjs/toolkit";

import http from "@util/http/http.util";

import type { FECopyItemsReturn, FEMoveItemsParams } from "../file-explorer.type";

export default createAsyncThunk<FECopyItemsReturn, FEMoveItemsParams>(
  "fe:copy::items",
  async function(params, thunkApi) {
    try {
      return await http.post<FECopyItemsReturn>("/storage/copy", { body: params, credentials: "include" });
    } catch(error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
