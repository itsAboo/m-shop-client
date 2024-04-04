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
import classes from "./styles/SignIn.module.css";
import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useContext, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Button from "../components/UI/Button/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signIn } from "../util/userApi";
import { UserContext } from "../context/UserContext";

type InputFormProps = "email" | "password";

export default function SignIn() {
  const userCtx = useContext(UserContext);

  const [showPassword, setShowPassword] = useState(false);
  const [mutateErr, setMutateErr] = useState({ isErr: false, errTxt: "" });
  const [inputForm, setInputForm] = useState({
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
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data?.user);
      userCtx.setIsLoggedIn(true);
      navigate("/products");
    },
    onError: (error) =>
      setMutateErr((prevErr) => ({
        ...prevErr,
        isErr: true,
        errTxt: error.message,
      })),
  });
  const emailIsInvalid =
    !inputForm.email.didEdit ||
    (inputForm.email.didEdit && inputForm.email.value.trim().length < 6) ||
    (inputForm.email.didEdit &&
      !inputForm.email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/));
  const passwordIsInValid =
    !inputForm.password.didEdit ||
    (inputForm.password.didEdit && inputForm.password.value.trim().length < 6);

  const validateInput = () => {
    if (emailIsInvalid) {
      setInputForm((prevInput) => ({
        ...prevInput,
        email: {
          ...prevInput.email,
          isError: true,
          errTxt: "email is invalid",
        },
      }));
    }
    if (passwordIsInValid) {
      setInputForm((prevInput) => ({
        ...prevInput,
        password: {
          ...prevInput.password,
          isError: true,
          errTxt: "at least 6 characters",
        },
      }));
    }
    if (emailIsInvalid || passwordIsInValid) {
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
      case "email":
        if (emailIsInvalid) {
          setInputForm((prevInput) => ({
            ...prevInput,
            email: {
              ...prevInput.email,
              isError: true,
              errTxt: "email is invalid",
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
              errTxt: "at least 6 characters",
            },
          }));
        }
        break;
    }
  };
  return (
    <div className={classes.container}>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmitForm} className={classes.form}>
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
          Don't have any account ?{" "}
          <Link to="/signup" state={"/signin"}>
            Click here
          </Link>{" "}
          to create account for free
        </p>
        <Button
          isLoading={isPending}
          disabled={
            inputForm.email.isError ||
            inputForm.password.isError ||
            mutateErr.isErr
          }
          className={classes.btn}
        >
          Sign In
        </Button>
      </form>
      <div className={classes["other-signup"]}>
        <p>or</p>
        <Button outlined>
          <span className={classes["gg-icon"]}>
            <GoogleIcon />
          </span>
          Sign In with Google
        </Button>
      </div>
    </div>
  );
}
