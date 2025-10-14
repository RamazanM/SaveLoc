import React, { useEffect, type FunctionComponent, type PropsWithChildren } from "react";
import { redirect, useNavigate } from "react-router";
import AuthService from "~/service/AuthService";
const ProtectedRoute: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const navigate = useNavigate();
  const authService = new AuthService();
  const isLoggedIn = authService.isLoggedIn();

  React.useEffect(() => {
    if (!isLoggedIn) {
      console.log("Redirecting to login");
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) return null;

  return children;
};

export default ProtectedRoute;
