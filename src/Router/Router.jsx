import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Authentiction/Login";
import ErrorPages from "../Pages/ErrorPages";
import Register from "../Pages/Authentiction/Register";
import Coverage from "../Coverage/Coverage";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import SendPercel from "../Pages/SendPercel";
import DashBordLayout from "../Layout/DashBordLayout";
import MyParcels from "../Pages/DashBord/MyParcels";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPages></ErrorPages>,
    children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
          path:'/coverage',
          element:<Coverage></Coverage>,
          loader: ()=> fetch('serviceCenter.json')
        },
        {
          path:'/send-percel',
          element: <PrivateRoute> <SendPercel></SendPercel> </PrivateRoute>,
          loader: ()=> fetch('serviceCenter.json')
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
    },
    
  ]

 },
 {
      path:'/dashbord',
      element:<PrivateRoute> <DashBordLayout></DashBordLayout> </PrivateRoute>,
      children:[
        {
          index:true,
          element:<MyParcels></MyParcels>
        }
      ]
    }

]);