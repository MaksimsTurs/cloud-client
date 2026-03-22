import { createAsyncThunk } from "@reduxjs/toolkit";

import http from "@util/http/http.util";
import serializeError from "@util/serialize-error.util";

import type { FEGetItemsReturn, FEGetItemsParams } from "../file-explorer.type";

export default createAsyncThunk<FEGetItemsReturn, FEGetItemsParams>(
  "fe::get::items",
  async function(params, thunkApi) {
    try {
      const data = await http.post<FEGetItemsReturn>("/storage/get/all", { body: { id: params.id }, credentials: "include" });
      return {...data!, name: params.name };
    } catch(error) {
      return thunkApi.rejectWithValue(await serializeError(error));
    }
  }
);
