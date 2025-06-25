import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import { Navigate, useLocation } from "react-router";
import Loading from "../Loading/Loading";

const PrivateRoute = ({children}) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loading></Loading>
  }

  if (!user) {
    <Navigate to={`/login`} state={{ from: location }}></Navigate>;
  }

  return children
};

export default PrivateRoute;
