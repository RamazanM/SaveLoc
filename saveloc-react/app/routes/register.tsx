import type { Route } from "./+types/home";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React from "react";
import AuthService from "~/service/AuthService";
import { useNavigate } from "react-router";
import type { RegisterCredentials, RegisterValidations } from "~/common/types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SaveLoc - Sign-Up" },
    { name: "description", content: "Welcome to SaveLoc!" },
  ];
}



export default function Register() {
  const [credentials, setCredentials] = React.useState<RegisterCredentials>({
    email: "",
    password: "",
    name: "",
    surname: "",
  });
  const [validations, setValidations] = React.useState<RegisterValidations>({
    email: { valid: true, message: null },
    password: { valid: true, message: null },
    name: { valid: true, message: null },
    surname: { valid: true, message: null },
  });
  const [registerResponse, setRegisterResponse] = React.useState("");
  const navigate = useNavigate();

  function validateCredentials(params: RegisterCredentials): RegisterValidations {
    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const isValidPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g;

    let validationResult: RegisterValidations = {
      email: { valid: true, message: null },
      password: { valid: true, message: null },
      name: { valid: true, message: null },
      surname: { valid: true, message: null },
    };

    if (!params.name) {
      validationResult = {
        ...validationResult,
        name: {
          valid: false,
          message: "Name is required.",
        },
      };
    }

    if (!params.surname) {
      validationResult = {
        ...validationResult,
        surname: {
          valid: false,
          message: "Surname is required.",
        },
      };
    }
    if (!params.email.match(isValidEmail))
      validationResult = {
        ...validationResult,
        email: {
          valid: false,
          message: "Please enter a correct email address.",
        },
      };
    if (!params.password.match(isValidPassword))
      validationResult = {
        ...validationResult,
        password: {
          valid: false,
          message:
            "Password must contain minimum eight characters, at least one letter and one number.",
        },
      };
    return validationResult;
  }

  function resetValidation() {
    setValidations({
      email: { valid: true, message: null },
      password: { valid: true, message: null },
      name: { valid: true, message: null },
      surname: { valid: true, message: null },
    });
  }

  function onSubmit() {
    const validationResult = validateCredentials(credentials);
    setValidations(validationResult);
    if (!validationResult.email.valid || !validationResult.password.valid)
      return;
    new AuthService().register(credentials).then(
      (response) => {
        if (response.success) {
          navigate("/login");
          setRegisterResponse("Register successful");
        } else {
          setRegisterResponse("Register failed: " + response.message);
        }
      },
      (error) => {
        setRegisterResponse("Register failed: " + error.message);
      }
    );
  }
  return (
    <div className="flex justify-center min-h-screen min-w-screen items-center">
      <div className="flex flex-col min-w-xl gap-5 min-h-screen justify-center items-center">
        <h1 className="text-4xl font-bold pb-10">Sign-Up</h1>
        <TextField
          label="Name"
          fullWidth
          className="min-w-screen"
          value={credentials.name}
          onChange={(e) => {
            resetValidation();
            setCredentials({ ...credentials, name: e.target.value });
          }}
          error={!validations.name.valid}
          helperText={validations.name.message}
        />
        <TextField
          label="Surname"
          fullWidth
          className="min-w-screen"
          value={credentials.surname}
          onChange={(e) => {
            resetValidation();
            setCredentials({ ...credentials, surname: e.target.value });
          }}
          error={!validations.surname.valid}
          helperText={validations.surname.message}
        />
        <TextField
          autoComplete="off"
          label="Email"
          fullWidth
          className="min-w-screen"
          value={credentials.email}
          onChange={(e) => {
            resetValidation();
            setCredentials({ ...credentials, email: e.target.value });
          }}
          error={!validations.email.valid}
          helperText={validations.email.message}
        />
        <TextField
          autoComplete="new-password"
          label="Password"
          fullWidth
          type="password"
          value={credentials.password}
          onChange={(e) => {
            resetValidation();
            setCredentials({ ...credentials, password: e.target.value });
          }}
          error={!validations.password.valid}
          helperText={validations.password.message}
        />
        <Button variant="contained" color="primary" onClick={onSubmit}>
          <h1 className="text-xl font-bold">Sign-Up</h1>
        </Button>
        <p>{registerResponse}</p>
      </div>
    </div>
  );
}
