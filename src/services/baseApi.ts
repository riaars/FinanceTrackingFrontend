import {
  fetchBaseQuery,
  createApi,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { log } from "console";

const API_URL = import.meta.env.VITE_API_URL;
let hasLoggedOut = false; // guard against cascaded 401s

const logoutOnce = (dispatch: (a: any) => void) => {
  if (hasLoggedOut) return;
  hasLoggedOut = true;
  dispatch(baseApi.util.resetApiState());
  if (location.pathname !== "/login") {
    window.location.assign("/login");
  }
};
const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    return headers;
  },
});

export const baseQueryWithAutoLogout: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extra) => {
  const result = await rawBaseQuery(args, api, extra);
  const status = (result as any)?.error?.status;
  if (status === 401 || status === 419) {
    logoutOnce(api.dispatch);
    window.location.href = "/login";
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithAutoLogout,
  tagTypes: ["Me", "Transaction"],
  endpoints: () => ({}),
});
