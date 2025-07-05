"use client";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../api/api";

export const speakWithAi = createAsyncThunk(
  "ai/aiAction",
  async ({ text }: { text: string }, thunkAPI) => {
    try {
      const response = await instance.post("api/v1/open_ai/ask", {
        text,
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
