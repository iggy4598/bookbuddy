import api from "../../store/api";
import { createSlice } from "@reduxjs/toolkit";

const singleBookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchBookDetails: builder.query({
      query: (bookId) => `/books/${bookId}`,
    }),
    checkoutBook: builder.mutation({
      query: ({ bookId, userId }) => ({
        url: `/books/checkout`,
        method: "POST",
        body: { bookId, userId },
      }),
    }),
  }),
});

const singleBookSlice = createSlice({
  name: "singleBook",
  initialState: {
    selectedBook: null,
    error: null,
  },
  reducers: {
    setSelectedBook(state, action) {
      state.selectedBook = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setSelectedBook, setError } = singleBookSlice.actions;
export const { useFetchBookDetailsQuery, useCheckoutBookMutation } = singleBookApi;
export default singleBookSlice.reducer;