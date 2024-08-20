import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TCategory } from "@Types/shared";

type Tresponse = TCategory[];

const actgetCatrgories = createAsyncThunk(
  "categories/getcatogries",
  async (_, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    try {
      const response = await axios.get<Tresponse>("/categories", { signal });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error))
        return rejectWithValue(
          error.response?.data || error.response?.data.message || error.message
        );
      else return rejectWithValue("Unexpected error");
    }
  }
);

export default actgetCatrgories;
