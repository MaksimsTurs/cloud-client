import { createAsyncThunk } from "@reduxjs/toolkit";

import fetcher from "@util/fetcher/fetcher.util";

import type { FECopyItemsReturn, FEMoveItemsParams } from "../file-explorer.type";

export default createAsyncThunk<FECopyItemsReturn, FEMoveItemsParams>(
  "fe:copy::items",
  async function(params, thunkApi) {
    try {
      const { error } = await fetcher.post<void>("/storage/copy", params, { credentials: "include" });

      if(error) {
        throw error;
      }

      return params.items;
    } catch(error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
