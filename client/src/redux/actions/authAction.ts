"use client";

import { createAsyncThunk } from '@reduxjs/toolkit'
import { instance } from '../api/api'
import { setCookie } from 'nookies'
import axios from 'axios'
import { LoginResponseType, UserType } from './types'

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await instance.post<LoginResponseType>('auth/login-non-admin', {
        email,
        password,
      })

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



      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  },
)

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({
    email,
    password,
    phone,
    lastName,
    firstName,
    timezone,
    roles,
    classUuid,
    classes = [],
    subjectUuId = "",
    telegram,
    whatsapp
  }:
    UserType,
    thunkAPI) => {
    try {
      const response = await instance.post<UserType>('auth/register', {
        email,
        roles,
        phone,
        password,
        timezone,
        lastName,
        firstName,
        classUuid,
        telegram,
        whatsapp,
        subjectUuId,
        classes
      })
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  },
)

export const passwordRecovery = createAsyncThunk(
  'auth/passwordRecovery',
  async (
    {
      email,
    }: {
      email: string
    },
    thunkAPI,
  ) => {
    try {
      const response = await instance.patch('auth/forgotPassword', {
        email,
        type: 'forgot-password'
      })

      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  },
)

export const passwordRecoveryCode = createAsyncThunk(
  'auth/passwordRecoveryCode',
  async (
    {
      email,
      code,
    }: {
      email: string
      code: string
    },
    thunkAPI,
  ) => {
    try {
      const response = await instance.patch('auth/verifyContact', {
        email,
        "type": "forgot-password",
        code,
      })

      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  },
)

export const passwordRecoveryResetPassword = createAsyncThunk(
  'auth/passwordRecoveryResetPassword',
  async (
    {
      email,
      code,
      password,
    }: {
      email: string
      code: string
      password: string
    },
    thunkAPI,
  ) => {
    try {
      const response = await instance.patch('auth/newPassword', {
        email,
        password,
        type: 'forgot-password'
      })

      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  },
)

export const refreshToken = createAsyncThunk(
  'auth/refresh',
  async (
    {
      refreshToken,
    }: {
      refreshToken: string
    },
    thunkAPI,
  ) => {
    try {
      const response = await axios.post(
        'auth/refresh-tokens',
        {
          refreshToken,
        },
        { withCredentials: true },
      )

      response.data.access &&
        setCookie(null, 'authToken', response.data.access, {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
        })

      response.data.access &&
        setCookie(null, 'refreshToken', response.data.refresh, {
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
