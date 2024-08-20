import { TLoading, Torder, isString } from "@Types/shared";
import { createSlice } from "@reduxjs/toolkit";
import actPlaceOrder from "./act/actPlaceOrder";
import actGetOrders from "./act/actGetOrders";

interface IorderSlice {
  orderlist: Torder[];
  loading: TLoading;
  error: null | string;
}

const initialState: IorderSlice = {
  orderlist: [],
  loading: "idle",
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    restOrderStatus: (state) => {
      state.loading = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    //Place Order
    builder.addCase(actPlaceOrder.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actPlaceOrder.fulfilled, (state) => {
      state.loading = "successeded";
    });
    builder.addCase(actPlaceOrder.rejected, (state, action) => {
      state.loading = "Failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
    //Get orders
    builder.addCase(actGetOrders.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetOrders.fulfilled, (state, action) => {
      state.loading = "successeded";
      state.orderlist = action.payload;
    });
    builder.addCase(actGetOrders.rejected, (state, action) => {
      state.loading = "Failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});
export const { restOrderStatus } = orderSlice.actions;
export { actPlaceOrder, actGetOrders };

export default orderSlice.reducer;
