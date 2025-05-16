/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../baseApi";

export const calenderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    connectAccount: builder.mutation({
      query: () => {
        return {
          url: "/calender/connect",
          method: "POST",
        };
      },
      invalidatesTags: ["Calender"],
    }),
    getAccountStatus: builder.query({
      query: (id: any) => {
        return {
          url: `/calender/status/${id}`,
          method: "GET",
        };
      },
      providesTags: ["Calender"],
    }),
    getProfile: builder.query({
      query: (id: any) => {
        console.log(id);
        return {
          url: `/clinician/get-single/user/${id}`,
          method: "GET",
        };
      },
      providesTags: ["Calender"],
    }),
  }),
});

export const {
  useConnectAccountMutation,
  useGetAccountStatusQuery,
  useGetProfileQuery,
} = calenderApi;
