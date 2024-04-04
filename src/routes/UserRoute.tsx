import { ReactNode } from "react";
import { useUser } from "../hooks/user.hook";
import { Navigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

export default function UserRoute({ children }: { children: ReactNode }) {
  const { data, isLoading, isError } = useUser();
  if (isLoading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <CircularProgress color="inherit" />
      </div>
    );
  }

  if (!data || isError) {
    return <Navigate to="/signin" />;
  }

  return children;
}
