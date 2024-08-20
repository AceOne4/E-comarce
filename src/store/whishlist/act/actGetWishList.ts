import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TProduct } from "@Types/shared";
import { RootState } from "@store/index";

type TDataType = "Ids" | "Fullinfo";
type TResponse = TProduct[];

const actGetWishList = createAsyncThunk(
  "wishlist/actGetWishlist",
  async (dataType: TDataType, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { authSlice } = getState() as RootState;
    try {
      const userWishlist = await axios.get<{ productId: number }[]>(
        `/wishlist?userId=${authSlice.user?.id}`
      );

      if (!userWishlist.data.length) {
        return { data: [], dataType: "empty" };
      }
      if (dataType === "Ids") {
        const concatenatedItemsId = userWishlist.data.map((el) => el.productId);
        return { data: concatenatedItemsId, dataType: "Ids" };
      } else {
        const concatenatedItemsId = userWishlist.data
          .map((el) => `id=${el.productId}`)
          .join("&");

        const response = await axios.get<TResponse>(
          `/products?${concatenatedItemsId}`
        );
        return { data: response.data, dataType: "Fullinfo" };
      }
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

export default actGetWishList;
