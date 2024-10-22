import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./slices/courses"; // Ensure this imports the correct reducer
import authReducer from "./slices/auth"; // Import the auth reducer

const store = configureStore({
  reducer: {
    courses: coursesReducer,
    auth: authReducer, // Add auth reducer to the store
  },
});

export default store;
