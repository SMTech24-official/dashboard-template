import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// const baseUrl =
//   import.meta.env.VITE_ENV === "production"
//     ? import.meta.env.NEXT_PUBLIC_URL
//     : import.meta.env.VITE_API_URL;

const baseUrl = import.meta.env.VITE_API_URL;

// Base API definition that uses FetchedQuery's baseQuery
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    credentials: "include",
    prepareHeaders: (headers) => {
      // Get the token or any required data from the state
      const token = Cookies.get("token");
      headers.set("accept", "application/json");
      if (token) {
        headers.set("authorization", `${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User", "Service", "Clinician"],
  endpoints: () => ({}),
});
