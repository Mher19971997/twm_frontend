"use client";
import { profileIndividual } from "@/redux/actions/profileIndividual";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  isLoading: false,
  error: "",
};

export const profileIndividualSlice = createSlice({
  name: "profileIndividual",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(profileIndividual.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(profileIndividual.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(
      profileIndividual.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.data = action.payload;
      }
    );
  },
});

export const profileIndividualReducer = profileIndividualSlice.reducer;
