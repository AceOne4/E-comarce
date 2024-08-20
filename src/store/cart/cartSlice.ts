import { TLoading, TProduct, isString } from "@Types/shared";
import { createSlice } from "@reduxjs/toolkit";
import actgetcartitemsbyId from "./act/actgetcartitemsbyId";
import {
  getCartQuantities,
  itemQuantityAvailabilityCheckingSelector,
} from "./selectors";
interface ICart {
  //index signature
  items: { [key: string]: number };
  ProductFullInfo: TProduct[];
  loading: TLoading;
  error: null | string;
}

const initialState: ICart = {
  items: {},
  ProductFullInfo: [],
  loading: "idle",
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const id = action.payload;
      if (state.items[id]) {
        state.items[id]++;
      } else {
        state.items[id] = 1;
      }
    },
    cartItemChangeQuantity: (state, action) => {
      state.items[action.payload.id] = action.payload.quantity;
    },
    cartItemRemove: (state, action) => {
      delete state.items[action.payload];
      state.ProductFullInfo = state.ProductFullInfo.filter(
        (el) => el.id !== action.payload
      );
    },
    cartCleanup: (state) => {
      state.ProductFullInfo = [];
    },

    clearCartAfterorder: (state) => {
      state.items = {};
      state.ProductFullInfo = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actgetcartitemsbyId.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actgetcartitemsbyId.fulfilled, (state, action) => {
      state.loading = "successeded";
      state.ProductFullInfo = action.payload;
    });
    builder.addCase(actgetcartitemsbyId.rejected, (state, action) => {
      state.loading = "Failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});
export {
  actgetcartitemsbyId,
  getCartQuantities,
  itemQuantityAvailabilityCheckingSelector,
};
export const {
  addToCart,
  cartItemChangeQuantity,
  cartItemRemove,
  cartCleanup,
  clearCartAfterorder,
} = cartSlice.actions;
export default cartSlice.reducer;
