import { createAsyncThunk } from "@reduxjs/toolkit";

import http from "@util/http/http.util";

import type { FECreateItemReturn, FECreateItemParams } from "../file-explorer.type";

export default createAsyncThunk<FECreateItemReturn, FECreateItemParams>(
  "fe::create::item",
  async function(params, thunkApi) {
    try {
      const data = await http.post<FECreateItemReturn>("/storage/create", { body: params, credentials: "include" }); 
      return data!;
    } catch(error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
