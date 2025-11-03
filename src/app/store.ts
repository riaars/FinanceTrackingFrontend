import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../services/baseApi";
import themeReducer from "../features/theme/themeSlice";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    theme: themeReducer,
  },
  middleware: (getDefault) => getDefault().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
