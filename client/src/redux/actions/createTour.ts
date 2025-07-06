"use client";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../api/api";

export interface ICreateTour {
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
  uuid?: string;
  type?: "organisation" | string;
  ownerUuid?: string;
  name?: string;
  start_date?: string;
  end_date?: string;
  img?: string;
  gallery?: string[];
  description?: string;
  status?: "active" | "inactive" | string;
  price?: number;
  rate?: number;
  tourType?: "package" | "individual" | string;
  fromLocation?: string | null;
  toLocation?: string | null;
  availableSeats?: number | null;
  totalGroupSize?: number | null;
  accommodationType?: string | null;
  hotelStars?: number | null;
  includedServices?: string[] | null;
}

export const createTour = createAsyncThunk(
  "tour/createTour",
  async ({ data, token, ...other }: any, thunkAPI) => {

    try {
      const response = await instance.post(
        "tour_organisation",
        data,
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
