"use client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../api/api";
import * as qs from "qs";

export const getTours = createAsyncThunk(
  "all/tours",
  async ({ token, query = {} }: { token: string; query?: any }, thunkAPI) => {
    try {
      const response = await instance.get(`tour?${qs.stringify(query)}`, {
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
