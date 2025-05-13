import { baseApi } from "../baseApi";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBlog: builder.mutation({
      query: (data) => {
        return {
          url: "/blog/create",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Blog"],
    }),
    getAllBlogs: builder.query({
      query: () => "/blog/get-all",
      providesTags: ["Blog"],
    }),

    getBlogById: builder.query({
      query: (id) => `/blog/get-single/${id}`,
      providesTags: ["Blog"],
    }),

    updateBlog: builder.mutation({
      query: ({ id, body }) => ({
        url: `/blog/update/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Blog"],
    }),

    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blog/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blog"],
    }),
  }),
});

export const {
  useCreateBlogMutation,
  useDeleteBlogMutation,
  useGetAllBlogsQuery,
  useGetBlogByIdQuery,
  useUpdateBlogMutation,
} = blogApi;
