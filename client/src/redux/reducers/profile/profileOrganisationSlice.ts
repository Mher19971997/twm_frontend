import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { profileOrganisation } from "../../thunk/profileOrganisationThunk";

const initialState = {
  data: {},
  isLoading: false,
  error: "",
};

const profileOrganisationSlice = createSlice({
  name: "profileOrganisation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(profileOrganisation.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(profileOrganisation.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    builder.addCase(profileOrganisation.fulfilled, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.data = action.payload;
    });
  },
});

export const profileOrganisationReducer = profileOrganisationSlice.reducer;
