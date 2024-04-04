import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { getToken, removeToken } from "../util/auth";
import { IUser } from "../util/interface";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export const useUser = () => {
  const userCtx = useContext(UserContext);
  return useQuery({
    queryKey: ["user"],
    queryFn: async ({ signal }) => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API}/user`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
            signal,
          }
        );
        return response.data.user as IUser;
      } catch (error: any) {
        if (error.response.status === 401) {
          removeToken();
        }
        return Promise.reject(new Error(error));
      }
    },
    enabled: !!getToken() || userCtx.isLoggedIn,
    retry: 1,
  });
};

export const useSignOut = () => {
  const userCtx = useContext(UserContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const signOut = () => {
    userCtx.setIsLoggedIn(false);
    queryClient.setQueriesData({ queryKey: ["user"] }, null);
    queryClient.setQueriesData({ queryKey: ["wishlist"] }, null);
    queryClient.setQueriesData({ queryKey: ["cart"] }, null);
    queryClient.setQueriesData({ queryKey: ["cart-items"] }, null);
    queryClient.setQueriesData({ queryKey: ["order"] }, null);
    removeToken();
    navigate("/");
  };
  return signOut;
};
