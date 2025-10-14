import type { Route } from "./+types/home";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React from "react";
import LoginService from "~/service/LoginService";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "SaveLoc - Login" },
    { name: "description", content: "Welcome to SaveLoc!" },
  ];
}

type Credentials = { email: String, password: String }
type Validations = { email: { valid: boolean, message: String | null }, password: { valid: boolean, message: String | null } }

export default function Login() {
  const [credentials, setCredentials] = React.useState<Credentials>({ email: "", password: "" });
  const [validations, setValidations] = React.useState<Validations>({ email: { valid: true, message: null }, password: { valid: true, message: null } })
  const [loginResponse, setLoginResponse] = React.useState("")

  function validateCredentials(params: Credentials): Validations {
    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const isValidPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g;

    let validationResult: Validations = { email: { valid: true, message: null }, password: { valid: true, message: null } }

    if (!params.email.match(isValidEmail)) validationResult = { ...validationResult, email: { valid: false, message: "Please enter a correct email address." } }
    if (!params.password.match(isValidPassword)) validationResult = { ...validationResult, password: { valid: false, message: "Password must contain minimum eight characters, at least one letter and one number." } }
    return validationResult
  }

  function resetValidation() {
    setValidations({ email: { valid: true, message: null }, password: { valid: true, message: null } })
  }

  function onSubmit() {
    const validationResult = validateCredentials(credentials)
    setValidations(validationResult)
    if (!validationResult.email.valid || !validationResult.password.valid) return;
    new LoginService().login(credentials.email, credentials.password).then((response) => {
      if (response.success) {
        setLoginResponse("Login successful");
      } else {
        setLoginResponse("Login failed: " + response.message);
      }
    }, (error) => {
      setLoginResponse("Login failed: " + error.message);
    });
  }
  return (
    <div className="flex justify-center min-h-screen min-w-screen items-center">
      <div className="flex flex-col min-w-xl gap-5 min-h-screen justify-center items-center">
        <h1 className="text-4xl font-bold pb-10">Login</h1>
        <TextField label="Email" fullWidth className="min-w-screen" value={credentials.email} onChange={(e) => { resetValidation(); setCredentials({ ...credentials, email: e.target.value }) }} error={!validations.email.valid} helperText={validations.email.message} />
        <TextField label="Password" fullWidth type="password" value={credentials.password} onChange={(e) => { resetValidation(); setCredentials({ ...credentials, password: e.target.value }) }} error={!validations.password.valid} helperText={validations.password.message} />
        <Button variant="contained" color="primary" onClick={onSubmit}><h1 className="text-xl font-bold">Login</h1></Button>
        <p>{loginResponse}</p>
      </div>

    </div>
  );
}
