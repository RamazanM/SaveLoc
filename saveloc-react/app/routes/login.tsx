import type { Route } from "./+types/home";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React from "react";
import LoginService from "~/service/LoginService";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SaveLoc - Login" },
    { name: "description", content: "Welcome to SaveLoc!" },
  ];
}

export default function Login() {
  const [credentials, setCredentials] = React.useState({ email: "", password: "" });

function onSubmit(){
  new LoginService().login(credentials.email, credentials.password).then((response) => {
    if(response.success){
      alert("Login successful");
    } else {
      alert("Login failed: " + response.message);
    }
  }, (error) => {
    alert("Login failed: " + error.message);
  });
}
  return (
    <div className="flex flex-col gap-5 min-h-screen justify-center items-center">  
      <h1 className="text-4xl font-bold pb-10">Login Page</h1>
        <TextField label="Email" value={credentials.email} onChange={(e) => setCredentials({...credentials, email:e.target.value})} />
        <TextField label="Password" type="password" value={credentials.password} onChange={(e) => setCredentials({...credentials, password:e.target.value})} />
        <Button variant="contained" color="primary" onClick={onSubmit}><h1 className="text-xl font-bold">Login</h1></Button>
    </div>
  );
}
