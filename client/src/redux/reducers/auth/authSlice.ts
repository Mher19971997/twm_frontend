"use client";


import { createSlice } from '@reduxjs/toolkit'
import {
    checkContact,
    loginUser,
    refreshToken,
    registerUser,
    verifyContact,
} from '../../actions/authAction'

import nookies, { destroyCookie } from 'nookies'
import { UserType } from '../../actions/types'
import { UserRoles } from '@/constants/userRoles';

const cookies = nookies.get(null)

export interface IAuth {
    token: string
    refreshToken: string
    user: UserType
    isLoading: boolean
    isAuth: boolean
    error: any
}

const initialState: IAuth = {
    token: cookies.authToken ?? '',
    refreshToken: cookies.refreshToken ?? '',
    user: {
        uuid: cookies.userId ?? '',
        email: cookies.userEmail ?? '',
        firstName: decodeURIComponent(cookies.userFirstName) ?? '',
        lastName: decodeURIComponent(cookies.userLastName) ?? '',
        roles: cookies.userRole as UserRoles ?? '',
        phone: cookies.userPhone ?? '',
        password: cookies.userPassword ?? '',
        classUuid: cookies.classUuid ?? '',
    },
    isLoading: false,
    isAuth: Boolean(cookies.authToken) ?? false,
    error: '',
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.isLoading = false
            state.isAuth = false
            state.error = ''
            state.token = ''
            state.refreshToken = ''
            state.user = {
                uuid: 0,
                email: '',
                firstName: '',
                lastName: '',
                roles: UserRoles.student,
                phone: '',
                password: '',
                classUuid: undefined
            }
            destroyCookie(null, 'authToken', {
                path: '/',
            })
            destroyCookie(null, 'refreshToken', {
                path: '/',
            })
            destroyCookie(null, 'userId', {
                path: '/',
            })
            destroyCookie(null, 'userEmail', {
                path: '/',
            })
            destroyCookie(null, 'userFirstName', {
                path: '/',
            })
            destroyCookie(null, 'userLastName', {
                path: '/',
            })
        },
        clearError(state) {
            state.error = ''
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.isLoading = true
            state.error = ''
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.isAuth = true
            state.error = ''
            state.token = action.payload.access_token
            state.refreshToken = action.payload.refresh_token
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
        builder.addCase(refreshToken.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(refreshToken.fulfilled, (state, action) => {
            state.isLoading = false
            state.isAuth = true
            state.error = ''
            state.token = action.payload.access
            state.refreshToken = action.payload.refresh
        })
        builder.addCase(refreshToken.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true
            // state.error = ''
        })
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.error = ''
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
        builder.addCase(checkContact.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(checkContact.fulfilled, (state, action) => {
            state.isLoading = false
            state.error = ''
        })
        builder.addCase(checkContact.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
        builder.addCase(verifyContact.pending, (state) => {
            state.isLoading = true
            state.error = ''
        })
        builder.addCase(verifyContact.fulfilled, (state, action) => {
            state.isLoading = false
            state.error = ''
        })
        builder.addCase(verifyContact.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
    },
})

export const authLogout = authSlice.actions.logout
export const clearError = authSlice.actions.clearError

export const authReducer = authSlice.reducer
