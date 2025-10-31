import { baseApi } from "@/services/baseApi";
import { LoginRequest, User, SignUpRequest, SignUpResponse } from "./type";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<void, LoginRequest>({
      query: (body) => ({
        url: "/signIn",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(baseApi.util.resetApiState());
      },
    }),

    signup: build.mutation<SignUpRequest, SignUpResponse>({
      query: (body) => ({
        url: "/signUp",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Me"],
    }),

    logout: build.mutation<void, void>({
      query: () => ({ url: "/logout", method: "POST" }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(baseApi.util.resetApiState());
      },
    }),

    me: build.query<User, void>({
      query: () => ({ url: "/getCurrentUser" }),
      providesTags: ["Me"],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useMeQuery,
} = authApi;
