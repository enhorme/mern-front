import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../axios";

export const fetchAllPosts = createAsyncThunk(
  "posts/fetchAllPosts",
  async () => {
    const { data } = await axios.get("/posts");
    return data;
  }
);

export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await axios.get("/tags");
  return data;
});

const initialState = {
  posts: {
    items: null,
    status: "loading",
  },
  tags: {
    items: null,
    status: "loading",
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllPosts.fulfilled]: ({ posts }, action) => {
      posts.status = "loaded";
      posts.items = action.payload;
    },
    [fetchAllPosts.pending]: ({ posts }) => {
      posts.status = "loading";
      posts.items = null;
    },
    [fetchAllPosts.rejected]: ({ posts }) => {
      posts.status = "error";
      posts.items = null;
    },

    [fetchTags.fulfilled]: ({ tags }, action) => {
      tags.status = "loaded";
      tags.items = action.payload;
    },
    [fetchTags.pending]: ({ tags }) => {
      tags.status = "loading";
      tags.items = null;
    },
    [fetchTags.rejected]: ({ tags }) => {
      tags.status = "error";
      tags.items = null;
    },
  },
});

export const selectPosts = (state) => state.posts.posts.items;
export const postReducer = postsSlice.reducer;
