"use client";

import { speakWithAi } from "@/redux/actions/aiAction";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  url: "",
  isLoading: false,
  error: "",
};

export const aiSlice = createSlice({
  name: "ai",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(speakWithAi.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(speakWithAi.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(
      speakWithAi.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.url = action.payload.data;
      }
    );
  },
});

export const aiReducer = aiSlice.reducer;
