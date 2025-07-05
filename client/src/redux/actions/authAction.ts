"use client";

import { createAsyncThunk } from '@reduxjs/toolkit'
import { instance } from '../api/api'
import { setCookie } from 'nookies'
import axios from 'axios'
import { LoginFormData, LoginType, RegistrationFormData, RegistrationType } from './types'

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (
    { userData, userType }: { userData: LoginFormData; userType: LoginType },
    thunkAPI
  ) => {
    try {
      const endpoint = `${userType}/login`;
      const response = await instance.post(endpoint, userData);
      response.data.access_token &&
        setCookie(null, 'authToken', response.data.access_token, {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
        })

      response.data.refresh_token &&
        setCookie(null, 'refreshToken', response.data.refresh_token, {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
        })

      setCookie(null, 'userType', userType, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      })


      return response.data;
    } catch (error: any) {
      console.error('Login error:', error?.response?.data);
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Login failed"
      );
    }
  }
);
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (
    { userData, userType }: { userData: RegistrationFormData; userType: RegistrationType },
    thunkAPI
  ) => {
    try {
      const endpoint = `${userType}/register`;
      const response = await instance.post(endpoint, userData);
      return response.data;
    } catch (error: any) {
      console.error('Registration error:', error?.response?.data);
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Registration failed"
      );
    }
  }
);


export const checkContact = createAsyncThunk(
  'auth/checkContact',
  async ({ email, type }: { email: string; type: string }, thunkAPI) => {
    try {
      const response = await instance.patch(`${type}/checkContact`, {
        email
      })
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  },
)

export const verifyContact = createAsyncThunk(
  'auth/verifyContact',
  async ({ email, code, type }: { email?: string; code: string; type: string }, thunkAPI) => {
    try {
      const response = await instance.patch(`${type}/verifyContact`, {
        code,
        email,
        type:
          type === 'auth_client'
            ? 'verify-contact'
            : type === 'auth_organisation'
              ? 'verify-contact-organisation'
              : type === 'auth_individual'
                ? 'verify-contact-individual'
                : '',
      })
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  },
)


export const refreshToken = createAsyncThunk(
  'auth/refresh',
  async ({
    refreshToken,
    type
  }: {
    refreshToken: string,
    type: 'auth_client' | 'auth_individual' | 'auth_organisation'
  }, thunkAPI) => {
    try {
      const response = await instance.post(
        `${type}/refresh`,
        {
          refreshToken,
        },
        { withCredentials: true },
      )

      response.data.access &&
        setCookie(null, 'authToken', response.data.access_token, {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
        })

      response.data.access &&
        setCookie(null, 'refreshToken', response.data.refresh_token, {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
        })

      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        errors: [error.message],
        fieldsErrors: undefined,
      })
    }
  },
)