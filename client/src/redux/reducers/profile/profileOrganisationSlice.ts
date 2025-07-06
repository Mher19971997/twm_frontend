"use client";
import { profileIndividual } from "@/redux/actions/profileIndividual";
import { profileOrganisation } from "@/redux/actions/profileOrganisation";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  isLoading: false,
  error: "",
};

export const profileOrganisationSlice = createSlice({
  name: "profileOrganisation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(profileOrganisation.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(profileOrganisation.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(
      profileOrganisation.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.data = action.payload;
      }
    );
  },
});

export const profileOrganisationReducer = profileOrganisationSlice.reducer;
