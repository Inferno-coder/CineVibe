import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "../slicers/locationSlice";

export const store = configureStore({
  reducer: {
    location: locationReducer,
  },
});
