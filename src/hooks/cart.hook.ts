import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ICart, ICartItems } from "../util/interface";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { getToken } from "../util/auth";
import { useUser } from "./user.hook";

interface IAddCart {
  productId: string | number;
  size: string;
  color: string;
}

interface IUpdateCart {
  productId: string | number;
  size: string;
  color: string;
  increase?: boolean;
  decrease?: boolean;
}

export const useGetCart = () => {
  const { data: user } = useUser();
  const userCtx = useContext(UserContext);
  return useQuery({
    queryKey: ["cart"],
    queryFn: async ({ signal }) => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API}/cart`,
          { signal, headers: { Authorization: `Bearer ${getToken()}` } }
        );
        const cart: ICart = response.data.cart;
        return cart;
      } catch (error: any) {
        return Promise.reject(new Error(error));
      }
    },
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: (user || userCtx.isLoggedIn) && !!getToken(),
  });
};

export const useGetCartItems = () => {
  return useQuery({
    queryKey: ["cart-items"],
    queryFn: async ({ signal }) => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API}/cart-items`,
          { signal, headers: { Authorization: `Bearer ${getToken()}` } }
        );
        const cartItems: ICartItems[] = response.data.cart;
        return cartItems;
      } catch (error: any) {
        return Promise.reject(new Error(error));
      }
    },
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

export const useAddCart = () => {
  const queryClient = useQueryClient();
  const userCtx = useContext(UserContext);
  return useMutation({
    mutationFn: async ({ productId, size, color }: IAddCart) => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_API}/cart`,
          {
            productId,
            color,
            size,
          },
          { headers: { Authorization: `Bearer ${getToken()}` } }
        );
        return response.data.msg;
      } catch (error: any) {
        return Promise.reject(new Error(error));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["cart-items"] });
    },
    onError: () => {
      userCtx.setIsLoggedIn(false);
      queryClient.setQueryData(["user"], null);
      queryClient.setQueriesData({ queryKey: ["cart"] }, null);
      queryClient.setQueriesData({ queryKey: ["cart-items"] }, null);
    },
  });
};

export const useUpdateCart = () => {
  const queryClient = useQueryClient();
  const userCtx = useContext(UserContext);
  return useMutation({
    mutationFn: async ({
      productId,
      size,
      color,
      increase,
      decrease,
    }: IUpdateCart) => {
      try {
        const response = await axios.patch(
          `${import.meta.env.VITE_APP_API}/cart`,
          { productId, color, size, increase, decrease },
          { headers: { Authorization: `Bearer ${getToken()}` } }
        );
        return response.data.msg;
      } catch (error: any) {
        return Promise.reject(new Error(error));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["cart-items"] });
    },
    onError: () => {
      userCtx.setIsLoggedIn(false);
      queryClient.setQueryData(["user"], null);
      queryClient.setQueriesData({ queryKey: ["cart"] }, null);
      queryClient.setQueriesData({ queryKey: ["cart-items"] }, null);
    },
  });
};

export const useDeleteCart = () => {
  const queryClient = useQueryClient();
  const userCtx = useContext(UserContext);
  return useMutation({
    mutationFn: async ({ productId, color, size }: IAddCart) => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_API}/cart/delete`,
          { productId, color, size },
          { headers: { Authorization: `Bearer ${getToken()}` } }
        );
        return response.data.msg;
      } catch (error: any) {
        if (error.response.status === 401) {
          return Promise.reject(new Error(error));
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["cart-items"] });
    },
    onError: () => {
      userCtx.setIsLoggedIn(false);
      queryClient.setQueryData(["user"], null);
      queryClient.setQueriesData({ queryKey: ["cart"] }, null);
      queryClient.setQueriesData({ queryKey: ["cart-items"] }, null);
    },
  });
};
