import { createAsyncThunk } from "@reduxjs/toolkit";

import http from "@util/http/http.util";

import type { FEMoveItemsParams, FEMoveItemsReturn } from "../file-explorer.type";

export default createAsyncThunk<FEMoveItemsReturn, FEMoveItemsParams>(
  "fe::move::items",
  async function(params, thunkApi) {
    try {
      await http.post<void>("/storage/move", { body: params, credentials: "include" });
      return params.items;
    } catch(error) {
      console.log(error)
      return thunkApi.rejectWithValue(error);
    }
  }
);
