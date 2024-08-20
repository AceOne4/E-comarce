import { createSlice } from "@reduxjs/toolkit";
import actgetCatrgories from "./act/actgetCatrgories";
import { TCategory, TLoading, isString } from "@Types/shared";
interface ICategoriesState {
  records: TCategory[];
  loading: TLoading;
  error: string | null;
}

const initialState: ICategoriesState = {
  records: [],
  loading: "idle",
  error: null,
};
const categories = createSlice({
  name: "categories",
  initialState,
  reducers: {
    categoryCleanUp: (state) => {
      state.records = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actgetCatrgories.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actgetCatrgories.fulfilled, (state, action) => {
      state.loading = "successeded";
      state.records = action.payload;
    });
    builder.addCase(actgetCatrgories.rejected, (state, action) => {
      state.loading = "Failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export const { categoryCleanUp } = categories.actions;
export { actgetCatrgories };
export default categories.reducer;
