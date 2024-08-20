import { Torder } from "@Types/shared";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import axios from "axios";

type Tresponse = Torder[];

const actGetOrders = createAsyncThunk(
  "orders/actgetOrders",
  async (_, ThunkAPI) => {
    const { rejectWithValue, getState, signal } = ThunkAPI;
    const { authSlice } = getState() as RootState;
    const userId = authSlice.user?.id;
    try {
      const resp = await axios.get<Tresponse>("/orders?userId=" + userId, {
        signal,
      });
      return resp.data;
    } catch (error) {
      if (axios.isAxiosError(error))
        return rejectWithValue(
          error.response?.data || error.response?.data.message || error.message
        );
      else return rejectWithValue("Unexpected error");
    }
  }
);

export default actGetOrders;
