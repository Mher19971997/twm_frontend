"use client";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../api/api";

export const speakWithAi = createAsyncThunk(
  "ai/aiAction",
  async ({ text, token }: { text: string; token: string }, thunkAPI) => {
    try {
      const response = await instance.post(
        "open_ai/ask",
        { text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);
