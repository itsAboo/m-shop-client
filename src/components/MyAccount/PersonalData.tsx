import { CircularProgress, FormControl, TextField } from "@mui/material";
import classes from "./PersonalData.module.css";
import Button from "../UI/Button/Button";
import { useUser } from "../../hooks/user.hook";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../../util/userApi";
import { useNavigate } from "react-router-dom";

export default function PersonalData() {
  const { data: user, isLoading, isSuccess } = useUser();
  const [email, setEmail] = useState(user?.email);
  const [inputForm, setInputForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    address: user?.address || "",
    phoneNumber: user?.phoneNumber || "",
  });
  const [didEdit, setDidEdit] = useState({
    firstName: false,
    lastName: false,
    address: false,
    phoneNumber: false,
  });
  const [isErr, setIsErr] = useState({
    firstName: { status: false, text: "" },
    lastName: { status: false, text: "" },
    phoneNumber: { status: false, text: "" },
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      setInputForm((prevInput) => ({
        ...prevInput,
        firstName: user?.firstName as string,
        lastName: user?.lastName as string,
        email: user?.email as string,
        address: user?.address as string,
        phoneNumber: user?.phoneNumber as string,
      }));
      setEmail(user?.email);
    }
  }, [isSuccess, user]);
  const { mutate, isPending } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      setDidEdit((prevEdit) => ({
        ...prevEdit,
        firstName: false,
        lastName: false,
        address: false,
        phoneNumber: false,
      }));
    },
    onError: () => {
      navigate(0);
    },
  });
  const firstNameIsInvalid =
    didEdit.firstName && inputForm.firstName?.length! < 4;
  const lastNameIsInvalid = didEdit.lastName && inputForm.lastName?.length! < 4;
  const phoneNumberIsInvalid =
    (didEdit.phoneNumber && inputForm.phoneNumber?.toString().length! < 10) ||
    !(didEdit.phoneNumber && inputForm.phoneNumber?.toString().match(/[0-9]/));
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputForm((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));
    setDidEdit((prevEdit) => ({ ...prevEdit, [e.target.name]: true }));
    setIsErr((prevErr) => ({
      ...prevErr,
      [e.target.name]: {
        ...prevErr[e.target.name as "firstName" | "lastName" | "phoneNumber"],
        status: false,
        text: "",
      },
    }));
  };
  const handleBlur = (name: string) => {
    switch (name) {
      case "firstName":
        if (firstNameIsInvalid) {
          setIsErr((prevErr) => ({
            ...prevErr,
            firstName: {
              ...prevErr.firstName,
              status: true,
              text: "Invalid value",
            },
          }));
        }
        break;
      case "lastName":
        if (lastNameIsInvalid) {
          setIsErr((prevErr) => ({
            ...prevErr,
            lastName: {
              ...prevErr.lastName,
              status: true,
              text: "Invalid value",
            },
          }));
        }
        break;
      case "phoneNumber":
        if (phoneNumberIsInvalid) {
          setIsErr((prevErr) => ({
            ...prevErr,
            phoneNumber: {
              ...prevErr.phoneNumber,
              status: true,
              text: "Invalid value",
            },
          }));
        }
    }
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutate({ inputForm });
  };
  return (
    <>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={classes.container}>
          <div className={classes.flex}>
            <FormControl className={classes["form-control"]}>
              <TextField
                onBlur={() => handleBlur("firstName")}
                onChange={handleChange}
                name="firstName"
                value={inputForm.firstName || ""}
                id="firstName"
                label="first name"
              />
            </FormControl>
            <FormControl className={classes["form-control"]}>
              <TextField
                onBlur={() => handleBlur("lastName")}
                onChange={handleChange}
                name="lastName"
                value={inputForm.lastName || ""}
                id="lastName"
                label="last name"
              />
            </FormControl>
          </div>
          <FormControl className={classes["form-control"]}>
            <TextField
              name="email"
              id="email"
              disabled
              variant="filled"
              value={email || ""}
              label="email"
            />
          </FormControl>
          <FormControl className={classes["form-control"]}>
            <TextField
              onChange={handleChange}
              name="address"
              label="address"
              id="address"
              value={inputForm.address || ""}
            />
          </FormControl>
          <FormControl className={classes["form-control"]}>
            <TextField
              error={isErr.phoneNumber.status}
              onBlur={() => handleBlur("phoneNumber")}
              helperText={isErr.phoneNumber.text}
              onChange={handleChange}
              name="phoneNumber"
              label="phone number"
              id="phoneNumber"
              value={inputForm.phoneNumber || ""}
            />
          </FormControl>
          <Button
            isLoading={isPending}
            disabled={
              !didEdit.firstName &&
              !didEdit.lastName &&
              !didEdit.address &&
              !didEdit.phoneNumber
            }
            className={classes.btn}
          >
            Update
          </Button>
        </form>
      )}
    </>
  );
}
