import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/auth/authSlice";
import { aiReducer } from "./reducers/ai/aiSlice";

const rootReducer = {
  auth: authReducer,
  ai: aiReducer,
};

export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export const store = configureStore({
  reducer: rootReducer,
});

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
