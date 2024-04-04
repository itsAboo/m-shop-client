import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getToken } from "../util/auth";
import { IWishList } from "../util/interface";
import { useUser } from "./user.hook";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const useWishList = () => {
  const { data: user } = useUser();
  return useQuery({
    queryKey: ["wishlist"],
    queryFn: async ({ signal }) => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API}/wishlist`,
          { headers: { Authorization: `Bearer ${getToken()}` }, signal }
        );
        return response.data.wishlist as IWishList[];
      } catch (error: any) {
        return Promise.reject(new Error(error));
      }
    },
    enabled: !!user && !!getToken(),
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

export const useUpdateWishList = () => {
  const userCtx = useContext(UserContext);
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add-wishlist"],
    mutationFn: async ({ productId }: { productId: string | number }) => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_API}/wishlist/update`,
          { productId },
          { headers: { Authorization: `Bearer ${getToken()}` } }
        );
        return response.data.msg;
      } catch (error: any) {
        return Promise.reject(new Error(error));
      }
    },
    onError: () => {
      userCtx.setIsLoggedIn(false);
      queryClient.setQueryData(["user"], null);
      queryClient.setQueryData(["wishlist"], null);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wishlist"],
      });
    },
  });
};
