"use client";
import { profileClient } from "@/redux/actions/profileClient";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  isLoading: false,
  error: "",
};

export const profileClientSlice = createSlice({
  name: "profileClient",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(profileClient.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(profileClient.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(
      profileClient.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.data = action.payload;
      }
    );
  },
});

export const profileClientReducer = profileClientSlice.reducer;
