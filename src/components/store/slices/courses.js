import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../axiosConfig/instance";

export const CoursesAction = createAsyncThunk("GetCourses", async () => {
  const res = await axiosInstance.get("/courses");
  return res.data;
});

const coursesListSlice = createSlice({
  name: "courses",
  initialState: { courses: [] }, // Fixed 'initialSlice' to 'initialState'
  extraReducers: (builder) => {
    builder.addCase(CoursesAction.fulfilled, (state, action) => {
      state.courses = action.payload;
      // console.log("Fetched courses:", action.payload); // Updated log message
    });
  },
});

export default coursesListSlice.reducer;
