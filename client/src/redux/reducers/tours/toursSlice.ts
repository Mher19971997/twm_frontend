"use client";
import { profileClient } from "@/redux/actions/profileClient";
import { getTours } from "@/redux/actions/toursAction";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  isLoading: false,
  error: "",
};

export const toursSlice = createSlice({
  name: "tours",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTours.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getTours.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(
      getTours.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.data = action.payload;
      }
    );
  },
});

export const toursReducer = toursSlice.reducer;
