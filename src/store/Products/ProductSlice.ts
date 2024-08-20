import { createSlice } from "@reduxjs/toolkit";
import actgetProductbyPrefix from "./act/actgetProductbyPrefix";
import { TProduct, TLoading, isString } from "@Types/shared";
interface ICategoriesState {
  records: TProduct[];
  loading: TLoading;
  error: string | null;
}

const initialState: ICategoriesState = {
  records: [],
  loading: "idle",
  error: null,
};
const Products = createSlice({
  name: "Products",
  initialState,
  reducers: {
    productsCleanUp: (state) => {
      state.records = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actgetProductbyPrefix.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actgetProductbyPrefix.fulfilled, (state, action) => {
      state.loading = "successeded";
      state.records = action.payload;
    });
    builder.addCase(actgetProductbyPrefix.rejected, (state, action) => {
      state.loading = "Failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export const { productsCleanUp } = Products.actions;
export { actgetProductbyPrefix };
export default Products.reducer;
