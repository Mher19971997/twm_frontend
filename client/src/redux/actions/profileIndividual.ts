"use client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../api/api";

export const profileIndividual = createAsyncThunk(
  "profile/profileIndividual",
  async (token: string, thunkAPI) => {

    try {
      const response = await instance.get("individual/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);
