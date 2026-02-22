import React from "react";
import { useUser } from "../context/UserContext";
import { Navigate, useLocation } from "react-router-dom";

const Auth = ({ children }) => {
  const location = useLocation();
  const { user } = useUser();
  return (
    <>
      {user?._id ? (
        children
      ) : (
        // navigate to login
        <Navigate to="/login" replace state={{ from: location }} />
      )}
    </>
  );
};

export default Auth;
