import { baseApi } from "../baseApi";

export const clinicianApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createClinician: builder.mutation({
      query: (data) => {
        return {
          url: "/clinician/create",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Clinician"],
    }),
    getAllClinician: builder.query({
      query: () => "/clinician/get-all",
      providesTags: ["Clinician"],
    }),

    getClinicianById: builder.query({
      query: (id) => `/clinician/get-single/${id}`,
      providesTags: ["Clinician"],
    }),

    updateClinician: builder.mutation({
      query: ({ id, body }) => ({
        url: `/clinician/update/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Clinician"],
    }),

    deleteClinician: builder.mutation({
      query: (id) => ({
        url: `/clinician/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Clinician"],
    }),
  }),
});

export const {
  useCreateClinicianMutation,
  useGetAllClinicianQuery,
  useUpdateClinicianMutation,
  useDeleteClinicianMutation,
  useGetClinicianByIdQuery,
} = clinicianApi;
