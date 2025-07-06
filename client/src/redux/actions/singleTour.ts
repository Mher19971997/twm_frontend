"use client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../api/api";

export const getSingleTour = createAsyncThunk(
  "single/tour",
  async ({ uuid, token }: { uuid: any; token: string }, thunkAPI) => {
    try {
      const response = await instance.get(`tour/${uuid}`, {
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
