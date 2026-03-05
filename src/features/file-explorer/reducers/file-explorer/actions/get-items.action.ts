import { createAsyncThunk } from "@reduxjs/toolkit";

import fetcher from "@util/fetcher/fetcher.util";

import type { FEGetItemsReturn, FEGetItemsParams } from "../file-explorer.type";

export default createAsyncThunk<FEGetItemsReturn, FEGetItemsParams>(
  "fe::get::items",
  async function(params, thunkApi) {
    try {
      const { data, error } = await fetcher.post<FEGetItemsReturn>("/storage/get/all", { id: params.id }, { credentials: "include" });

      if(error) {
        throw error;
      }

      return {...data!, name: params.name };
    } catch(error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
