import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Authentiction/Login";
import ErrorPages from "../Pages/ErrorPages";
import Register from "../Pages/Authentiction/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPages></ErrorPages>,
    children:[
        {
            path:'/',
            element:<Home></Home>
        }
    ]
  },
 {
  path:'/',
  element:<AuthLayout></AuthLayout>,
  children:[
    {
      path:'/login',
      element:<Login></Login>
    },
    {
      path:'/register',
      element: <Register></Register>
    }
  ]

  
 }
]);