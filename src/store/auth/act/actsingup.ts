import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type TformData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const actsingup = createAsyncThunk(
  "auth/actsingup",
  async (data: TformData, ThunkAPI) => {
    const { rejectWithValue } = ThunkAPI;
    try {
      const respose = await axios.post("/signup", data);
      return respose.data;
    } catch (error) {
      if (axios.isAxiosError(error))
        return rejectWithValue(
          error.response?.data || error.response?.data.message || error.message
        );
      else return rejectWithValue("Unexpected error");
    }
  }
);

export default actsingup;
