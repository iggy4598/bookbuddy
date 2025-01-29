import api from "../../store/api";
import { createSlice } from "@reduxjs/toolkit";

const accountApi = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchAccountDetails: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["User"],
    }),
    returns: builder.mutation({
      query: ({ a }) => ({
        url: `/reservations/${a}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

const accountSlice = createSlice({
  name: "account",
  initialState: {
    user: null,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      localStorage.removeItem("token");
    },
  },
});

export const { useFetchAccountDetailsQuery, useReturnsMutation } = accountApi;

export const { logout } = accountSlice.actions;
export default accountSlice.reducer;