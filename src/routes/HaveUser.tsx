import { ReactNode } from "react";
import { useUser } from "../hooks/user.hook";
import { Navigate } from "react-router-dom";
import { getToken } from "../util/auth";

export default function HaveUser({ children }: { children: ReactNode }) {
  const { data: user, isLoading } = useUser();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (user && !!getToken()) {
    return <Navigate to="/" />;
  }
  return children;
}
