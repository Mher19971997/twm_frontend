import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/auth/authSlice";
import { aiReducer } from "./reducers/ai/aiSlice";
import { createTourReducer } from "./reducers/createTour/CreateTourSlice";

const rootReducer = {
  auth: authReducer,
  ai: aiReducer,
  createTour: createTourReducer,
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
