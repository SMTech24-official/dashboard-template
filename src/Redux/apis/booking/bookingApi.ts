/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../baseApi";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooking: builder.query({
      query: () => {
        return {
          url: `/booking/clinician`,
          method: "GET",
        };
      },
      providesTags: ["Calender"],
    }),
    getAllAdminBooking: builder.query({
      query: () => {
        return {
          url: `/booking`,
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
  useGetAllBookingQuery,
  useGetProfileQuery,
  useGetAllAdminBookingQuery,
} = bookingApi;
