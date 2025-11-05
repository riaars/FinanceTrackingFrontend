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

    signup: build.mutation<SignUpResponse, SignUpRequest>({
      query: (body) => ({
        url: "/signUp",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Me"],
    }),

    verifyEmail: build.mutation<{ message: string }, { token: string }>({
      query: (body) => ({
        url: "/verifyEmail",
        method: "POST",
        body,
      }),
    }),

    changePassword: build.mutation<
      { message: string },
      { oldPassword: string; newPassword: string }
    >({
      query: (body) => ({
        url: "/changePassword",
        method: "POST",
        body,
      }),
    }),

    forgotPassword: build.mutation<
      { code: String; message: string },
      { email: string }
    >({
      query: (body) => ({
        url: "/forgotPassword",
        method: "POST",
        body: body,
      }),
    }),

    resetPassword: build.mutation<
      { code: string; message: string },
      { token: string; password: string }
    >({
      query: (body) => ({
        url: "/resetPassword",
        method: "POST",
        body,
      }),
    }),

    logout: build.mutation<void, void>({
      query: () => ({ url: "/logout", method: "POST" }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.log(error);
        } finally {
          dispatch(baseApi.util.resetApiState());
          window.location.assign("/login");
        }
      },
    }),

    me: build.query<{ code: string; data: User }, void>({
      query: () => ({ url: "/getCurrentUser" }),
      providesTags: ["Me"],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useVerifyEmailMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useLogoutMutation,
  useMeQuery,
} = authApi;
