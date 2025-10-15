import Button from "@mui/material/Button";
import React from "react";
import { Link, useNavigate } from "react-router";
import AuthService from "~/service/AuthService";

const authService = new AuthService();

function logout() {
  authService.logout();
  window.location.reload();
}

export default function Header() {
  const isLoggedIn = authService.isLoggedIn();

  return (
    <header className="min-w-screen flex absolute justify-around items-center">
      <h1 className="text-3xl p-3">SaveLoc</h1>
      <div className="flex gap-1">
        <Link to={"/"}>
          <Button variant="outlined">Home</Button>
        </Link>
        {!isLoggedIn ? (
          <>
            <Link to={"/register"}>
              <Button variant="outlined">Register</Button>
            </Link>
            <Link to={"/login"}>
              <Button variant="outlined">Login</Button>{" "}
            </Link>
          </>
        ) : (
          <>
            <Link to={"/places"}>
              <Button variant="outlined">Places</Button>
            </Link>
            <Button onClick={logout} variant="outlined">
              Logout
            </Button>
          </>
        )}
      </div>
    </header>
  );
}
