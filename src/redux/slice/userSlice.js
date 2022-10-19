import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../axios";

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (value, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/auth/login", value);
      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const fetchUserMe = createAsyncThunk(
  "auth/fetchUserMe",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/auth/me");
      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const fetchRegisterUser = createAsyncThunk(
  "auth/fetchRegisterUser",
  async (value) => {
    const { data } = await axios.post("/auth/register", value);
    return data;
  }
);

const initialState = {
  data: null,
  status: "loading",
  error: null,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLogout: (state) => {
      state.data = null;
      state.status = "loaded";
    },
  },
  extraReducers: {
    [fetchUser.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
      state.error = null;
    },
    [fetchUser.pending]: (state) => {
      state.status = "loading";
      state.data = null;
      state.error = null;
    },
    [fetchUser.rejected]: (state, action) => {
      state.status = "loaded";
      state.data = null;
      state.error = action.payload;
    },
    [fetchUserMe.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
      state.error = null;
    },
    [fetchUserMe.pending]: (state) => {
      state.status = "loading";
      state.data = null;
      state.error = null;
    },
    [fetchUserMe.rejected]: (state, action) => {
      state.status = "loaded";
      state.error = null;
      state.data = null;
    },
    [fetchRegisterUser.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
      state.error = null;
    },
    [fetchRegisterUser.pending]: (state) => {
      state.status = "loading";
      state.data = null;
      state.error = null;
    },
    [fetchRegisterUser.rejected]: (state, action) => {
      state.status = "loaded";
      state.error = action.payload;
      state.data = null;
    },
  },
});

export const selectUserAuth = (state) => !!state.auth.data;
export const selectUserError = (state) => state.auth.error;
export const { userLogout } = userSlice.actions;
export const userReducer = userSlice.reducer;
