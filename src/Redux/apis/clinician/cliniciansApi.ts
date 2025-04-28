import { baseApi } from "../baseApi";

export const clinicianApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createClinician: builder.mutation({
      query: (data) => {
        return {
          url: "/clinician/create",
          method: "POST",
          body:data,
        };
      },
      invalidatesTags: ["Service"],
    }),
    getAllService: builder.query({
      query: () => "/service/get-all",
      providesTags: ["Service"],
    }),

    getServiceById: builder.query({
      query: (id) => `/service/get-single/${id}`,
      providesTags: ["Service"],
    }),

    updateService: builder.mutation({
      query: ({ id, body }) => ({
        url: `/service/update/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Service"],
    }),

    deleteService: builder.mutation({
      query: (id) => ({
        url: `/service/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Service"],
    }),
  }),
});

export const {
  useCreateClinicianMutation,
  useGetAllServiceQuery,
  useGetServiceByIdQuery,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = clinicianApi;
