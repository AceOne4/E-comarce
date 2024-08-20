import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import axios from "axios";

const actPlaceOrder = createAsyncThunk(
  "orders/actplaceOrder",
  async (subTotal: number, ThunkAPI) => {
    const { rejectWithValue, getState } = ThunkAPI;
    const { authSlice, cartSlice } = getState() as RootState;
    const orderItem = cartSlice.ProductFullInfo.map((el) => ({
      id: el.id,
      title: el.title,
      price: el.price,
      img: el.img,
      quantity: cartSlice.items[el.id],
    }));
    try {
      const resp = await axios.post("/orders", {
        userId: authSlice.user?.id,
        items: orderItem,
        subTotal,
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

export default actPlaceOrder;
