"use client";

import { createTour, ICreateTour } from "@/redux/actions/createTour";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  data: ICreateTour;
  isLoading: boolean;
  error: string;
}

const initialState: IInitialState = {
  data: {},
  isLoading: false,
  error: "",
};

export const createTourSlice = createSlice({
  name: "createTour",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createTour.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(createTour.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(
      createTour.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.data = action.payload.data;
      }
    );
  },
});

export const createTourReducer = createTourSlice.reducer;
