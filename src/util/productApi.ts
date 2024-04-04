import axios from "axios";
import { ProductInputForm } from "../admin/AdminProduct";
import { IProduct } from "./interface";

export interface IQueryProduct {
  sort?: "asc" | "desc" | "newest";
  colors?: string;
  category?: string;
  min?: number;
  max?: number;
}

export const createProduct = async ({
  inputForm,
}: {
  inputForm: ProductInputForm;
}) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_API}/product/create`,
      inputForm
    );
    return response.data.msg;
  } catch (err: any) {
    if (err.response) {
      throw new Error(err.response.data.msg);
    }
  }
};

export const getProducts = async ({
  signal,
  query,
}: {
  signal: AbortSignal;
  query: IQueryProduct;
}) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API}/product`,
      { params: query, signal }
    );
    return response.data.products as IProduct[];
  } catch (err: any) {
    if (err.response) {
      throw new Error(err.response.data.msg);
    }
  }
};

export const getProduct = async ({
  signal,
  id,
}: {
  signal: AbortSignal;
  id: string | undefined;
}) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API}/product/${id}`,
      {
        signal,
      }
    );
    return response.data.product as IProduct;
  } catch (err: any) {
    if (err.response) {
      throw new Error(err.response.data.msg);
    }
  }
};

export const getProductNewest = async ({
  signal,
  limit,
}: {
  signal: AbortSignal;
  limit: number;
}) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API}/product/newest/${limit}`,
      { signal }
    );
    return response.data.products as IProduct[] || null;
  } catch (err: any) {
    if (err.response) {
      throw new Error(err.response.data.msg);
    }
  }
};
