import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/auth/authSlice";
import { aiReducer } from "./reducers/ai/aiSlice";
import { createTourReducer } from "./reducers/createTour/CreateTourSlice";
import { profileClientReducer } from "./reducers/profile/profileClientSlice";
import { profileIndividualReducer } from "./reducers/profile/profileIndividualSlice";
import { profileOrganisationReducer } from "./reducers/profile/profileOrganisationSlice";
import { toursReducer } from "./reducers/tours/toursSlice";
import { singleTourReducer } from "./reducers/singleTour/singleTourSlice";

const rootReducer = {
  auth: authReducer,
  ai: aiReducer,
  createTour: createTourReducer,
  profileClient: profileClientReducer,
  profileIndividual: profileIndividualReducer,
  profileOrganisation: profileOrganisationReducer,
  tours: toursReducer,
  singleTour: singleTourReducer
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
