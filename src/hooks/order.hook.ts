import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { IOrders } from "../util/interface";
import { getToken } from "../util/auth";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useUser } from "./user.hook";

export const usePlaceOrder = () => {
  const queryClient = useQueryClient();
  const userCtx = useContext(UserContext);
  return useMutation({
    mutationFn: async ({ paymentMethod }: { paymentMethod: string }) => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_API}/order`,
          { paymentMethod },
          { headers: { Authorization: `Bearer ${getToken()}` } }
        );
        return response.data.order as IOrders;
      } catch (error: any) {
        return Promise.reject(new Error(error));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["cart-items"] });
      queryClient.invalidateQueries({ queryKey: ["order"] });
    }, 
    onError: () => {
      userCtx.setIsLoggedIn(false);
      queryClient.setQueryData(["user"], null);
    },
  });
};

export const useGetOrder = () => {
  const { data: user } = useUser();
  const userCtx = useContext(UserContext);
  return useQuery({
    queryKey: ["order"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API}/order`,
          { headers: { Authorization: `Bearer ${getToken()}` } }
        );
        return response.data.orders as IOrders[];
      } catch (error: any) {
        return Promise.reject(new Error(error));
      }
    },
    enabled: (user || userCtx.isLoggedIn) && !!getToken(),
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
