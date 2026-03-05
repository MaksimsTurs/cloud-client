import { createAsyncThunk } from "@reduxjs/toolkit";

import fetcher from "@util/fetcher/fetcher.util";

import type { FERemoveItemsReturn, FERemoveItemsParams } from "../file-explorer.type";

export default createAsyncThunk<FERemoveItemsReturn, FERemoveItemsParams>(
  "fe::remove::items",
  async function(params, thunkApi) {
    try {
      const { error } = await fetcher.post<void>("/storage/remove", params, { credentials: "include" });
      
      if(error) {
        throw error;
      }

      return params;
    } catch(error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
