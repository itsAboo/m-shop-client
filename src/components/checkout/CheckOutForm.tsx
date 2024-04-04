import { FormControl, TextField } from "@mui/material";
import classes from "./CheckOutForm.module.css";
import Button from "../UI/Button/Button";
import { ChangeEvent, useEffect, useState } from "react";
import { IConfirmed } from "./CheckOutAddressConfirmed";

interface ICheckOutForm {
  firstName: string;
  lastName: string;
  address: string;
  onConfirm: (data: IConfirmed) => void;
}

export default function CheckOutForm(props: ICheckOutForm) {
  const [formInput, setFormInput] = useState({
    firstName: "",
    lastName: "",
    address: "",
    province: "",
    city: "",
    zipCode: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    setFormInput((prev) => ({
      ...prev,
      firstName: props.firstName,
      lastName: props.lastName,
      address: props.address,
    }));
  }, [props]);
  return (
    <form className={classes.container}>
      <div className={classes.flex}>
        <FormControl className={classes["form-control"]}>
          <TextField
            onChange={handleChange}
            name="firstName"
            value={formInput.firstName || ""}
            id="first-name"
            label="First name"
          />
        </FormControl>
        <FormControl className={classes["form-control"]}>
          <TextField
            onChange={handleChange}
            name="lastName"
            value={formInput.lastName || ""}
            id="last-name"
            label="Last name"
          />
        </FormControl>
      </div>
      <FormControl className={classes["form-control"]}>
        <TextField
          onChange={handleChange}
          name="address"
          value={formInput.address || ""}
          id="address"
          label="Address"
        />
      </FormControl>
      <FormControl className={classes["form-control"]}>
        <TextField
          onChange={handleChange}
          name="province"
          value={formInput.province}
          id="province"
          label="Province"
        />
      </FormControl>
      <div className={classes.flex}>
        <FormControl className={classes["form-control"]}>
          <TextField
            onChange={handleChange}
            name="city"
            value={formInput.city}
            id="city"
            label="City"
          />
        </FormControl>
        <FormControl className={classes["form-control"]}>
          <TextField
            onChange={handleChange}
            name="zipCode"
            value={formInput.zipCode}
            id="zip-code"
            label="Zip Code"
          />
        </FormControl>
      </div>
      <Button
        onClick={() => props.onConfirm(formInput)}
        className={classes.btn}
        type="button"
      >
        Next <span className={classes.arrow}>&#10142;</span>
      </Button>
    </form>
  );
}
