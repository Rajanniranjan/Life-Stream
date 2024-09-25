import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import API from "../../services/API";
import { getCurrentUser } from "../../redux/features/auth/authActions";
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();

  //get user current
  const getUser = async () => {
    try {
      const { data } = await API.get("/auth/current-user");
      if (data?.success) {
        // if success then do dispatch
        dispatch(getCurrentUser(data));
      }
    } catch (error) {
      // agar error aaya to token automatic delete ho jayega
      // localstorage.clear() se
      localStorage.clear();
      console.log(error);
    }
  };

// intial time par user chahiye, jaise hi redirect ho rha hai
// usi time token ke base par user ko authenticate karna hai
// useEffect use
  useEffect(() => {
    getUser();
  });

  if (localStorage.getItem("token")) {
    return children;
  } else {
    // if not find token then redirect to login page
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
