import api from "../../store/api";
import { createSlice } from "@reduxjs/toolkit";

const booksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
      providesTags: ["Books"],
    }),
  }),
});

const booksSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    error: null,
  },
  reducers: {
    setBooks(state, action) {
      state.books = action.payload;
      state.error = null;
    },
    setBooksError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setBooks, setBooksError } = booksSlice.actions;
export const { useGetBooksQuery } = booksApi;
export default booksSlice.reducer;

