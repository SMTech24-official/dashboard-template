import { baseApi } from "../baseApi";

export const clinicianApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStatistics: builder.query({
      query: (params: { days: number }) => ({
        url: `/auth/dashboard-analytics`,
        method: "GET",
        params: { ...params },
      }),
      providesTags: ["User", "Service", "Clinician", "Blog"],
    }),
  }),
});

export const { useGetDashboardStatisticsQuery } = clinicianApi;
