import { createSlice } from "@reduxjs/toolkit";
import actToggelLike from "./act/actToggelLike";
import actGetWishList from "./act/actGetWishList";
import { TLoading, TProduct, isString } from "@Types/shared";
import { authLogout } from "@store/auth/authSlice";

interface IWishList {
  ProductId: number[];
  error: null | string;
  loading: TLoading;
  ProductFullInfo: TProduct[];
}

const initialState: IWishList = {
  ProductId: [],
  error: null,
  loading: "idle",
  ProductFullInfo: [],
};

const whishlistSlice = createSlice({
  name: "whishlist",
  initialState,
  reducers: {
    whishlistCleanUp: (state) => {
      state.ProductFullInfo = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actToggelLike.pending, (state) => {
      state.error = null;
    });
    builder.addCase(actToggelLike.fulfilled, (state, action) => {
      if (action.payload.type === "add") {
        state.ProductId.push(action.payload.id);
      } else {
        state.ProductId = state.ProductId.filter(
          (el) => el !== action.payload.id
        );
        state.ProductFullInfo = state.ProductFullInfo.filter(
          (el) => el.id !== action.payload.id
        );
      }
    });
    builder.addCase(actToggelLike.rejected, (state, action) => {
      if (isString(action.payload)) state.error = action.payload;
    });

    // get Whishlist
    builder.addCase(actGetWishList.pending, (state) => {
      state.error = null;
      state.loading = "pending";
    });
    builder.addCase(actGetWishList.fulfilled, (state, action) => {
      if (action.payload.dataType === "Ids") {
        state.ProductId = action.payload.data as number[];
      } else if (action.payload.dataType === "Fullinfo") {
        state.ProductFullInfo = action.payload.data as TProduct[];
      }

      state.loading = "successeded";
    });
    builder.addCase(actGetWishList.rejected, (state, action) => {
      state.loading = "Failed";
      if (isString(action.payload)) state.error = action.payload;
    });
    // listen up to logout
    builder.addCase(authLogout, (state) => {
      state.ProductFullInfo = [];
      state.ProductId = [];
    });
  },
});

export { actToggelLike, actGetWishList };
export const { whishlistCleanUp } = whishlistSlice.actions;
export default whishlistSlice.reducer;
