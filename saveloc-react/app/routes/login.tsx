import type { Route } from "./+types/home";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React from "react";
import AuthService from "~/service/AuthService";
import { useNavigate } from "react-router";
import type { LoginCredentials, LoginValidations } from "~/common/types";
import CircularProgress from "@mui/material/CircularProgress";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "SaveLoc - Login" },
    { name: "description", content: "Welcome to SaveLoc!" },
  ];
}


export default function Login() {
  const [credentials, setCredentials] = React.useState<LoginCredentials>({ email: "", password: "" });
  const [validations, setValidations] = React.useState<LoginValidations>({ email: { valid: true, message: null }, password: { valid: true, message: null } })
  const [loginResponse, setLoginResponse] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const navigate = useNavigate();
  
  function validateCredentials(params: LoginCredentials): LoginValidations {
    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const isValidPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g;

    let validationResult: LoginValidations = { email: { valid: true, message: null }, password: { valid: true, message: null } }

    if (!params.email.match(isValidEmail)) validationResult = { ...validationResult, email: { valid: false, message: "Please enter a correct email address." } }
    if (!params.password.match(isValidPassword)) validationResult = { ...validationResult, password: { valid: false, message: "Password must contain minimum eight characters, at least one letter and one number." } }
    return validationResult
  }

  function resetValidation() {
    setValidations({ email: { valid: true, message: null }, password: { valid: true, message: null } })
  }

  function onSubmit() {
    setLoading(true)
    const validationResult = validateCredentials(credentials)
    setValidations(validationResult)
    if (!validationResult.email.valid || !validationResult.password.valid) return;
    new AuthService().login(credentials).then((response) => {
      if (response.success) {
        setLoading(false)
        navigate("/")
        setLoginResponse("Login successful");
      } else {
        setLoading(false)
        setLoginResponse("Login failed: " + response.message);
      }
    }, (error) => {
      setLoading(false)
      setLoginResponse("Login failed: " + error.message);
    });
  }
  return (
    <div className="flex justify-center min-h-screen min-w-screen items-center">
      <div className="flex flex-col min-w-xl gap-5 min-h-screen justify-center items-center">
        <h1 className="text-4xl font-bold pb-10">Login</h1>
        <TextField label="Email" fullWidth className="min-w-screen" value={credentials.email} onChange={(e) => { resetValidation(); setCredentials({ ...credentials, email: e.target.value }) }} error={!validations.email.valid} helperText={validations.email.message} />
        <TextField label="Password" fullWidth type="password" value={credentials.password} onChange={(e) => { resetValidation(); setCredentials({ ...credentials, password: e.target.value }) }} error={!validations.password.valid} helperText={validations.password.message} />
        <Button className="hover:animate-pulse" variant="contained" color="primary" onClick={onSubmit}>{loading?(<CircularProgress color="inherit"/>):(<h1 className="text-xl font-bold">Login</h1>)}</Button>
        <p>{loginResponse}</p>
      </div>

    </div>
  );
}
