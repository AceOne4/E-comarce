import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TProduct } from "@Types/shared";

type Tresponse = TProduct[];

const actgetProductbyPrefix = createAsyncThunk(
  "products/getproductsbyprfix",
  async (prefix: string, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    try {
      const response = await axios.get<Tresponse>(
        `/products?cat_prefix=${prefix}`,
        { signal }
      );

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

export default actgetProductbyPrefix;
