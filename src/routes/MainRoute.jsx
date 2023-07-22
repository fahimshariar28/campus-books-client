import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import Colleges from "../Pages/Colleges/Colleges";
import SingleCollege from "../Pages/SingleCollege/SingleCollege";

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
      { path: "/admission", element: <h1>Admission</h1> },
      { path: "/mycollege", element: <h1>My College</h1> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
]);

export default router;
