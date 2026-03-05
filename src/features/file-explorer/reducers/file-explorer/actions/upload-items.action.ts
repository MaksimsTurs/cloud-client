import { createAsyncThunk } from "@reduxjs/toolkit";

import fetcher from "@util/fetcher/fetcher.util";

import type { FEUploadItemsReturn, FEUploadItemsParams } from "../file-explorer.type";

import { formObjectToFormData } from "@util/std/std.util";

export default createAsyncThunk<FEUploadItemsReturn, FEUploadItemsParams>(
  "fe::upload::items",
  async function(params, thunkApi) {
    try {
      const { data, error } = await fetcher.post<FEUploadItemsReturn>("/storage/upload", formObjectToFormData(params), { credentials: "include" });
    
      if(error) {
        throw error;
      }
  
      return data!
    } catch(error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
