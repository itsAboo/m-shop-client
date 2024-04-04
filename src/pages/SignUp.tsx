import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import classes from "./styles/Signup.module.css";
import { FormEvent, useContext, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/UI/Button/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUp } from "../util/userApi";
import { UserContext } from "../context/UserContext";

type InputFormProps = "firstName" | "lastName" | "email" | "password";

export default function SignUp() {
  const userCtx = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const [mutateErr, setMutateErr] = useState({ isErr: false, errTxt: "" });
  const [inputForm, setInputForm] = useState({
    firstName: {
      value: "",
      didEdit: false,
      isError: false,
      errTxt: "",
    },
    lastName: {
      value: "",
      didEdit: false,
      isError: false,
      errTxt: "",
    },
    email: {
      value: "",
      didEdit: false,
      isError: false,
      errTxt: "",
    },
    password: {
      value: "",
      didEdit: false,
      isError: false,
      errTxt: "",
    },
  });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data?.user);
      userCtx.setIsLoggedIn(true);
      navigate("/");
    },
    onError: (error) => {
      setMutateErr((prevErr) => ({
        ...prevErr,
        isErr: true,
        errTxt: error.message,
      }));
    },
  });
  const firstNameIsInvalid =
    !inputForm.firstName.didEdit ||
    (inputForm.firstName.didEdit &&
      inputForm.firstName.value.trim().length < 4) ||
    (inputForm.firstName.didEdit &&
      !inputForm.firstName.value.match(/^[a-zA-Z]+$/));

  const lastNameIsInvalid =
    !inputForm.lastName.didEdit ||
    (inputForm.lastName.didEdit &&
      inputForm.lastName.value.trim().length < 4) ||
    (inputForm.lastName.didEdit &&
      !inputForm.lastName.value.match(/^[a-zA-Z]+$/));

  const emailIsInvalid =
    !inputForm.email.didEdit ||
    (inputForm.email.didEdit && inputForm.email.value.trim().length < 6) ||
    (inputForm.email.didEdit &&
      !inputForm.email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/));
  const passwordIsInValid =
    !inputForm.password.didEdit ||
    (inputForm.password.didEdit && inputForm.password.value.trim().length < 6);

  const validateInput = () => {
    if (firstNameIsInvalid) {
      setInputForm((prevInput) => ({
        ...prevInput,
        firstName: {
          ...prevInput.firstName,
          isError: true,
          errTxt: "*at least 4 characters",
        },
      }));
    }
    if (lastNameIsInvalid) {
      setInputForm((prevInput) => ({
        ...prevInput,
        lastName: {
          ...prevInput.lastName,
          isError: true,
          errTxt: "*at least 4 characters",
        },
      }));
    }
    if (emailIsInvalid) {
      setInputForm((prevInput) => ({
        ...prevInput,
        email: {
          ...prevInput.email,
          isError: true,
          errTxt: "*email is invalid",
        },
      }));
    }
    if (passwordIsInValid) {
      setInputForm((prevInput) => ({
        ...prevInput,
        password: {
          ...prevInput.password,
          isError: true,
          errTxt: "*at least 6 characters",
        },
      }));
    }
    if (
      firstNameIsInvalid ||
      lastNameIsInvalid ||
      emailIsInvalid ||
      passwordIsInValid
    ) {
      return false;
    } else {
      return true;
    }
  };
  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();
    if (!validateInput()) {
      return;
    }
    mutate({
      inputForm: {
        firstName: inputForm.firstName.value,
        lastName: inputForm.lastName.value,
        email: inputForm.email.value,
        password: inputForm.password.value,
      },
    });
  };
  const handleInputChange = (name: InputFormProps, value: string) => {
    setMutateErr((prevErr) => ({ ...prevErr, isErr: false, errTxt: "" }));
    setInputForm((prevInput) => ({
      ...prevInput,
      [name]: {
        ...prevInput[name],
        value: value,
        didEdit: true,
        isError: false,
        errTxt: "",
      },
    }));
  };
  const handleBlur = (name: InputFormProps) => {
    switch (name) {
      case "firstName":
        if (firstNameIsInvalid) {
          setInputForm((prevInput) => ({
            ...prevInput,
            firstName: {
              ...prevInput.firstName,
              isError: true,
              errTxt: "*at least 4 characters",
            },
          }));
        }
        break;
      case "lastName":
        if (lastNameIsInvalid) {
          setInputForm((prevInput) => ({
            ...prevInput,
            lastName: {
              ...prevInput.lastName,
              isError: true,
              errTxt: "*at least 4 characters",
            },
          }));
        }
        break;
      case "email":
        if (emailIsInvalid) {
          setInputForm((prevInput) => ({
            ...prevInput,
            email: {
              ...prevInput.email,
              isError: true,
              errTxt: "*email is invalid",
            },
          }));
        }
        break;
      case "password":
        if (passwordIsInValid) {
          setInputForm((prevInput) => ({
            ...prevInput,
            password: {
              ...prevInput.password,
              isError: true,
              errTxt: "*at least 6 characters",
            },
          }));
        }
        break;
    }
  };
  return (
    <div className={classes.container}>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmitForm} className={classes.form}>
        <FormControl className={classes["name-lastname"]}>
          <TextField
            onBlur={() => handleBlur("firstName")}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            helperText={inputForm.firstName.errTxt}
            value={inputForm.firstName.value}
            error={inputForm.firstName.isError}
            id="firstName"
            label="first name"
            type="text"
            fullWidth
          />
          <TextField
            onBlur={() => handleBlur("lastName")}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            helperText={inputForm.lastName.errTxt}
            value={inputForm.lastName.value}
            id="lastName"
            error={inputForm.lastName.isError}
            label="last name"
            type="text"
            fullWidth
          />
        </FormControl>
        <FormControl className={classes.email}>
          <TextField
            onBlur={() => handleBlur("email")}
            onChange={(e) => handleInputChange("email", e.target.value)}
            value={inputForm.email.value}
            error={inputForm.email.isError || mutateErr.isErr}
            helperText={
              mutateErr.isErr ? mutateErr.errTxt : inputForm.email.errTxt
            }
            className={classes.email}
            id="email"
            label="email"
            variant="outlined"
            type="email"
          />
        </FormControl>
        <FormControl className={classes.password}>
          <InputLabel error={inputForm.password.isError}>password</InputLabel>
          <OutlinedInput
            onBlur={() => handleBlur("password")}
            onChange={(e) => handleInputChange("password", e.target.value)}
            value={inputForm.password.value}
            error={inputForm.password.isError}
            className={classes.password}
            id="password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={() => setShowPassword((show) => !show)}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="password"
          />
          <FormHelperText error className={classes["pw-helper-txt"]}>
            {inputForm.password.isError && inputForm.password.errTxt}
          </FormHelperText>
        </FormControl>
        <p className={classes.desc}>
          Already have an account ? <Link to="/signin">Click here</Link> to sign
          in
        </p>
        <Button
          isLoading={isPending}
          disabled={
            inputForm.email.isError ||
            inputForm.password.isError ||
            inputForm.firstName.isError ||
            inputForm.lastName.isError ||
            mutateErr.isErr
          }
          className={classes.btn}
        >
          Sign Up
        </Button>
      </form>
      <div className={classes["other-signup"]}>
        <p>or</p>
        <Button outlined className={classes["other-signup-btn"]}>
          <span className={classes["gg-icon"]}>
            <GoogleIcon />
          </span>
          Sign up with Google
        </Button>
      </div>
    </div>
  );
}
