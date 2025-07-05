"use client";

import axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import nookies, { destroyCookie } from "nookies";
import { jwtDecode } from "jwt-decode";
import { refreshToken } from "../actions/authAction";
import { store } from "../store";

const settings = {
  withCredentials: true,
};

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_BASE_URL,
  ...settings,
});

const noAuthEndpoints = [
  "/auth/login",
  "/auth/register",
  "/auth/forgotPassword",
  "/auth/verifyContact",
  "/auth/newPassword",
  "/class",
];


interface RetryAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const onRequest = async (
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
  if (noAuthEndpoints.some((endpoint) => config.url?.endsWith(endpoint))) {
    return config;
  }

  const cookies = nookies.get(null);
  const token = cookies.authToken;

  if (!token) {
    return config;
  }

  const decodedToken: { exp: number } = jwtDecode(token);
  const isExpired = decodedToken.exp * 1000 < Date.now();

  if (!isExpired) {
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  }

  const refresh = cookies.refreshToken;
  if (!refresh) {
    destroyCookie(null, "authToken");
    destroyCookie(null, "refreshToken");
    return config;
  }

  try {
    const response = await store.dispatch(
      refreshToken({ refreshToken: refresh }) as any
    );

    if (response.meta.requestStatus === "fulfilled") {
      const newAccessToken = response.payload.access;

      nookies.set(null, "authToken", newAccessToken, {
        maxAge: 60 * 60 * 24,
        path: "/",
      });

      config.headers["Authorization"] = `Bearer ${newAccessToken}`;
      return config;
    } else {
      destroyCookie(null, "authToken");
      destroyCookie(null, "refreshToken");
      return config;
    }
  } catch (err) {
    console.error("Token refresh failed", err);
    destroyCookie(null, "authToken");
    destroyCookie(null, "refreshToken");
    return config;
  }
};

const onRequestError = async (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};


const onResponseError = async (error: AxiosError) => {

  const originalRequest = error.config as RetryAxiosRequestConfig;

  if (
    (error.response?.status === 401 || error.response?.status === 403) &&
    !originalRequest?._retry
  ) {
    originalRequest._retry = true;

    const cookies = nookies.get(null);
    const refresh = cookies.refreshToken;

    if (!refresh) {
      destroyCookie(null, "authToken");
      destroyCookie(null, "refreshToken");
      return Promise.reject(error);
    }

    try {
      const response = await store.dispatch(
        refreshToken({ refreshToken: refresh }) as any
      );

      if (response.meta.requestStatus === "fulfilled") {
        const newAccessToken = response.payload.access;
        nookies.set(null, "authToken", newAccessToken, {
          maxAge: 60 * 60 * 24,
          path: "/",
        });

        (originalRequest as InternalAxiosRequestConfig).headers["Authorization"] = `Bearer ${newAccessToken}`;
        return instance(originalRequest);
      } else {
        destroyCookie(null, "authToken");
        destroyCookie(null, "refreshToken");
        return Promise.reject(error);
      }
    } catch (refreshError) {
      destroyCookie(null, "authToken");
      destroyCookie(null, "refreshToken");
      return Promise.reject(refreshError);
    }
  }

  return Promise.reject(error);
};

instance.interceptors.request.use(onRequest, onRequestError);
instance.interceptors.response.use((res) => res, onResponseError);
