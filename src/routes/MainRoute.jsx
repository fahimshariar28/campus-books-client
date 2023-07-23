import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import Colleges from "../Pages/Colleges/Colleges";
import SingleCollege from "../Pages/SingleCollege/SingleCollege";
import Admission from "../Pages/Admission/Admission";
import PrivateRoute from "./PrivateRoute";
import SelectCollege from "../Pages/Admission/SelectCollege";
import MyCollege from "../Pages/MyCollege/MyCollege";
import Profile from "../Pages/Profile/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/colleges",
        element: <Colleges />,
        loader: () => fetch("http://localhost:5000/colleges/total"),
      },
      {
        path: "/college/:id",
        element: <SingleCollege />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/college/${params.id}`),
      },
      {
        path: "/admission",
        element: (
          <PrivateRoute>
            <Admission />
          </PrivateRoute>
        ),
      },
      {
        path: "/admission/:id",
        element: (
          <PrivateRoute>
            <SelectCollege />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/college/${params.id}`),
      },
      {
        path: "/mycollege",
        element: (
          <PrivateRoute>
            <MyCollege />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
]);

export default router;
