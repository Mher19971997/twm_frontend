import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './reducers/auth/authSlice';

const rootReducer = {
  auth: authReducer,
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
