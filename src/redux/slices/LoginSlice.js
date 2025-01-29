import api from "../../store/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "login/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || "Login failed.");
      }
      return data;
    } catch (error) {
      return rejectWithValue("An error occurred. Please try again.");
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: {
    isAuthenticated: false,
    user: null,
    error: null,
  },
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      localStorage.removeItem("token");
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.error = null;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.payload;
      });
  },
});

const loginApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addLogin: builder.mutation({
      query: ({ email, password }) => ({
        url: "/users/login",
        method: "POST",
        body: { email, password },
      }),
    }),
  }),
});
export const { useAddLoginMutation } = loginApi;
export const { logout, clearError } = loginSlice.actions;
export default loginSlice.reducer;
