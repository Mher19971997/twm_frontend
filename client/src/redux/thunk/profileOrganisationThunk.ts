import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../api/api";

export const profileOrganisation = createAsyncThunk(
    "profile/profileOrganisation",
    async (token: string, thunkAPI) => {
        try {
            const response = await instance.get("organisation/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Что-то пошло не так"
            );
        }
    }
);
