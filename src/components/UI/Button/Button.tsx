import { HTMLAttributes, ReactNode } from "react";
import classes from "./Button.module.css";
import { CircularProgress } from "@mui/material";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  type?: "submit" | "button";
  outlined?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
}

export default function Button(props: ButtonProps) {
  const { outlined, isLoading, ...otherProps } = props;

  return (
    <button
      disabled={props.disabled}
      id={outlined ? classes.outlined : classes.filled}
      type={props.type || "submit"}
      {...otherProps}
    >
      {isLoading ? (
        <CircularProgress size="27px" color="inherit" />
      ) : (
        props.children
      )}
    </button>
  );
}
