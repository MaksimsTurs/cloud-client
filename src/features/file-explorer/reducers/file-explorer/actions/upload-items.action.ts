import { createAsyncThunk } from "@reduxjs/toolkit";

import http from "@util/http/http.util";

import type { FEUploadItemsReturn, FEUploadItemsParams } from "../file-explorer.type";

import { fromObjectToFormData } from "@util/to.util";

export default createAsyncThunk<FEUploadItemsReturn, FEUploadItemsParams>(
  "fe::upload::items",
  async function(params, thunkApi) {
    try {
      const data = await http.post<FEUploadItemsReturn>("/storage/upload", {
        body: fromObjectToFormData(params),
        credentials: "include" 
      });   
      return data!
    } catch(error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
