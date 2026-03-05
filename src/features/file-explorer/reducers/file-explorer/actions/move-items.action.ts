import { createAsyncThunk } from "@reduxjs/toolkit";

import fetcher from "@util/fetcher/fetcher.util";

import type { FEMoveItemsParams, FEMoveItemsReturn } from "../file-explorer.type";

export default createAsyncThunk<FEMoveItemsReturn, FEMoveItemsParams>(
  "fe::move::items",
  async function(params, thunkApi) {
    try {
      const { error } = await fetcher.post<void>("/storage/move", params, { credentials: "include" });
      
      if(error) {
        throw error;
      }
     
      return params.items;
    } catch(error) {
      console.log(error)
      return thunkApi.rejectWithValue(error);
    }
  }
);
