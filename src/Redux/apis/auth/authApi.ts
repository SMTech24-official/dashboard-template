import {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
    UserProfile,
  } from "../auth/authType";
  import { baseApi } from "../baseApi";
  
  export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      login: builder.mutation<LoginResponse, LoginRequest>({
        query: (body) => ({
          url: "/auth/login",
          method: "POST",
          body,
        }),
      }),
  
      register: builder.mutation<RegisterResponse, RegisterRequest>({
        query: (body) => ({
          url: "/user/register",
          method: "POST",
          body,
        }),
      }),
  
      getMe: builder.query<{ success: boolean; data: UserProfile }, void>({
        query: () => "/auth/get-me",
      }),
  
      verifyOtp: builder.mutation<
        { success: boolean; data: { accessToken: string } },
        { email: string; otp: string }
      >({
        query: (body) => ({
          url: "/auth/verify-otp",
          method: "POST",
          body,
        }),
      }),
  
      forgotPassword: builder.mutation<
        { success: boolean; message: string },
        { email: string }
      >({
        query: (body) => ({
          url: "/auth/forgot-password",
          method: "POST",
          body,
        }),
      }),
  
      resetPassword: builder.mutation<
        { success: boolean; message: string },
        { userId: string; password: string }
      >({
        query: (body) => ({
          url: "/auth/reset-password",
          method: "POST",
          body,
        }),
      }),
  
      sendOtp: builder.mutation<
        { success: boolean; message: string; data: { message: string } },
        { email: string }
      >({
        query: (body) => ({
          url: "/auth/send-otp",
          method: "POST",
          body,
        }),
      }),
    }),
  });
  
  export const {
    useLoginMutation,
    useRegisterMutation,
    useGetMeQuery,
    useVerifyOtpMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useSendOtpMutation,
  } = authApi;