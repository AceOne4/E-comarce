import { TProduct } from "@Types/shared";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import axios from "axios";

type TResponse = TProduct[];

const actgetcartitemsbyId = createAsyncThunk(
  "cart/getcartitems",
  async (_, ThunkAPI) => {
    //get state it get the state and work on it
    // the other approachog sending data from the component will make the cart component rerender with every change happening
    const { rejectWithValue, fulfillWithValue, getState } = ThunkAPI;
    const { cartSlice } = getState() as RootState;
    const itemsId = Object.keys(cartSlice.items);
    // aguard to prevent the app from rendering all data during the first mount
    if (!itemsId.length) {
      return fulfillWithValue([]);
    }

    try {
      //filtiring in json
      const concatenatedItemsId = itemsId.map((el) => `id=${el}`).join("&");
      const response = await axios.get<TResponse>(
        `/products?${concatenatedItemsId}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data || error.response?.data.message || error.message
        );
      } else {
        return rejectWithValue("An unexpected error");
      }
    }
  }
);

export default actgetcartitemsbyId;
