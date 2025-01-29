import api from "../../store/api";
import { createSlice } from "@reduxjs/toolkit";

const singleBookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchBookDetails: builder.query({
      query: (bookId) => `/books/${bookId}`,
    }),
    checkoutBook: builder.mutation({
      query: ({ bookId }) => ({
        url: `/books/${bookId}/checkout`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Books"],
    }),
    returnBook: builder.mutation({
      query: ({ bookId }) => ({
        url: `/books/${bookId}/return`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

export const { useFetchBookDetailsQuery, useCheckoutBookMutation, useReturnBookMutation } = singleBookApi;
export default singleBookApi;