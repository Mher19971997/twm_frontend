"use client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../api/api";

export const profileClient = createAsyncThunk(
  "profile/profileClient",
  async (token: string, thunkAPI) => {
    try {
      const response = await instance.get("user/profile", {
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);
