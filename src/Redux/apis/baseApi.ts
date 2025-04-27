import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// Base API definition that uses FetchedQuery's baseQuery
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:6001/api/v1",
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
  tagTypes: ["User", "Service"],
  endpoints: () => ({}),
});