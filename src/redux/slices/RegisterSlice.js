import api from "../../store/api";
import { createSlice } from "@reduxjs/toolkit";
const registerSlice = createSlice({
  name: "register",
  initialState: {
    user: null,
    error: null,
  },
  reducers: {
    registerUser(state, action) {
      state.user = action.payload;
      state.error = null;
    },
    registerError(state, action) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

const registerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addUser: builder.mutation({
      query: ({ firstname, lastname, email, password }) => ({
        url: "/users/register",
        method: "POST",
        body: { firstname, lastname, email, password },
      }),
    }),
  }),
});

export const { useAddUserMutation } = registerApi;
export const { registerUser, registerError, clearError } = registerSlice.actions;
export default registerSlice.reducer;
