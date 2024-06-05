import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./features/usersSlice";
import movieSlice from "./features/movieSlice";

export const store = configureStore({
  reducer: {
    users: usersSlice,
    movies: movieSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
