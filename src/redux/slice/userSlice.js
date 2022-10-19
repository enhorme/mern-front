import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../axios";

export const fetchUser = createAsyncThunk("auth/fetchUser", async (value) => {
  const { data } = await axios.post("/auth/login", value);
  return data;
});

export const fetchUserMe = createAsyncThunk(
  "auth/fetchUserMe",
  async (token) => {
    const { data } = await axios.get("/auth/me", {
      headers: {
        authorization: token,
      },
    });
    return data;
  }
);

const initialState = {
  data: null,
  status: "loading",
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [fetchUser.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchUser.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchUser.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
    [fetchUserMe.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchUserMe.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchUserMe.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
  },
});

export const selectUserAuth = (state) => state.auth.data;

export const userReducer = userSlice.reducer;
