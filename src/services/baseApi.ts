// src/services/baseApi.ts
import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

// Put your API root in an env var (Vite example)
// e.g. VITE_API_URL=https://api.example.com
const API_URL = import.meta.env.VITE_API_URL;

const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_URL, // <- your API root, e.g. https://api.example.com
  credentials: "include", // <- send/receive cookies
  prepareHeaders: (headers) => {
    // Add CSRF header here if your server requires it, e.g.:
    // headers.set('X-CSRF-Token', getCsrfTokenFromCookie());
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: rawBaseQuery,
  tagTypes: ["Me", "Transaction"],
  endpoints: () => ({}),
});
