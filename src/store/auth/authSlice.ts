import { TLoading, isString } from "@Types/shared";
import { createSlice } from "@reduxjs/toolkit";
import actsingup from "./act/actsingup";
import actlogin from "./act/actlogin";
interface IAuthstate {
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  } | null;
  accessToken: string | null;
  loading: TLoading;
  error: string | null;
}

const initialState: IAuthstate = {
  user: null,
  accessToken: null,
  loading: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetUI: (state) => {
      state.loading = "idle";
      state.error = null;
    },
    authLogout: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actsingup.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actsingup.fulfilled, (state) => {
      state.loading = "successeded";
    });
    builder.addCase(actsingup.rejected, (state, action) => {
      state.loading = "Failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });

    //login
    builder.addCase(actlogin.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actlogin.fulfilled, (state, action) => {
      state.loading = "successeded";
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    });
    builder.addCase(actlogin.rejected, (state, action) => {
      state.loading = "Failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export { actsingup, actlogin };
export const { resetUI, authLogout } = authSlice.actions;
export default authSlice.reducer;
