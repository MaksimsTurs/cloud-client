import { createAsyncThunk } from "@reduxjs/toolkit";

import fetcher from "@util/fetcher/fetcher.util";

import type { FECreateItemReturn, FECreateItemParams } from "../file-explorer.type";

export default createAsyncThunk<FECreateItemReturn, FECreateItemParams>(
  "fe::create::item",
  async function(params, thunkApi) {
    try {
      const { data, error } = await fetcher.post<FECreateItemReturn>("/storage/create", params, { credentials: "include" }); 
    
      if(error) {
        throw error
      }

      return data!;
    } catch(error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
