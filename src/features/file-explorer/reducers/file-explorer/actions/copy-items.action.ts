import { createAsyncThunk } from "@reduxjs/toolkit";

import http from "@util/http/http.util";

import type { FECopyItemsParams, FECopyItemsReturn } from "../file-explorer.type";

export default createAsyncThunk<FECopyItemsReturn, FECopyItemsParams>(
  "fe:copy::items",
  async function(params, thunkApi) {
    try {
      return await http.post<FECopyItemsReturn>("/storage/copy", { body: params, credentials: "include" });
    } catch(error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
