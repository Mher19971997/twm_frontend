"use client";
import { getSingleTour } from "@/redux/actions/singleTour";
import { getTours } from "@/redux/actions/toursAction";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  isLoading: false,
  error: "",
};

export const singleTourSlice = createSlice({
  name: "singleTour",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSingleTour.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getSingleTour.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(
      getSingleTour.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.data = action.payload;
      }
    );
  },
});

export const singleTourReducer = singleTourSlice.reducer;
