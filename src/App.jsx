import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"; // Import Provider
// Import your components
import DefaultLayout from "./layouts/DefaultLayout";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/HomePage";
import Error from "./pages/Error";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import { ThemeProvider } from "./ThemeProvider";
import "./App.css";
import MyCourses from "./pages/app/MyCourses";
import CourseDetials from "./pages/app/CourseDetials";
import StudentProfile from "./pages/app/StdProfile";
import store from "./components/store/store";
import LoginGuard from "./components/Guard/LoginGuard";
import Exam from "./pages/app/exam";
import ForgotPassword from "./pages/app/reset";
import NewPassword from "./pages/app/Newpass";
import GradeCoursesPage from "./pages/app/GradeCoursesPage";
import VideoPlayer from "./pages/app/VideoPlayer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { index: true, element: <HomePage />, errorElement: <NotFound /> },
      { path: "/login", element: <Login />, errorElement: <NotFound /> },
      { path: "/register", element: <Register />, errorElement: <NotFound /> },
      {
        path: "/exam",
        element: (
          <LoginGuard>
            <Exam />
          </LoginGuard>
        ),
        errorElement: <NotFound />,
      },
      {
        path: "/reset",
        element: <ForgotPassword />,
        errorElement: <NotFound />,
      },
      {
        path: "/user/reset/:token",
        element: <NewPassword />,
        errorElement: <NotFound />,
      },

      {
        path: "/mycourses",
        element: (
          <LoginGuard>
            <MyCourses />
          </LoginGuard>
        ),
        errorElement: <NotFound />,
      },
      {
        path: "/myprofile",
        element: (
          <LoginGuard>
            <StudentProfile />
          </LoginGuard>
        ),
        errorElement: <NotFound />,
      },
      {
        path: "/singlecourse/:CourseId",
        element: <CourseDetials />,
        errorElement: <NotFound />,
      },

      {
        path: "/video-player/:id",
        element: (
          <LoginGuard>
            <VideoPlayer />
          </LoginGuard>
        ),
        errorElement: <NotFound />,
      },
      {
        path: "/courses/:grade",
        element: (
          <LoginGuard>
            <GradeCoursesPage />
          </LoginGuard>
        ),
        errorElement: <NotFound />,
      },
      { path: "*", element: <NotFound />, errorElement: <Error /> },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
