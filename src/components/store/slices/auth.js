import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../axiosConfig/instance";

export const loginUser = createAsyncThunk("auth/login", async (userData) => {
  const response = await axiosInstance.post("/users/login", userData);
  return response.data;
});
// console.log(loginUser);
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: !!localStorage.getItem("token") || false,
    user: localStorage.getItem("user") || null,
    // ? JSON.parse(localStorage.getItem("user"))
    // : null, // Check if user exists before parsing
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        // console.log(action.payload.access_token);

        localStorage.setItem("token", action.payload.access_token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
