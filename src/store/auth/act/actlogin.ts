import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type TformData = {
  email: string;
  password: string;
};

type Tresponse = {
  accessToken: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
};

const actlogin = createAsyncThunk(
  "auth/actlogin",
  async (data: TformData, thunkpi) => {
    const { rejectWithValue } = thunkpi;
    try {
      const response = await axios.post<Tresponse>("/login", data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error))
        return rejectWithValue(
          error.response?.data || error.response?.data.message || error.message
        );
      else return rejectWithValue("Unexpected error");
    }
  }
);

export default actlogin;
