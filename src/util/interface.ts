export interface IUser {
  userId?: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  phoneNumber?: number | string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProduct {
  productId?: number;
  name?: string;
  description?: string;
  imageUrl?: string;
  price?: number;
  colors?: string;
  size?: string;
  type?: string;
  category?: string;
  subCategory?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IWishList {
  productId?: number;
  name?: string;
  description?: string;
  imageUrl?: string;
  price?: number;
  colors?: string;
  size?: string;
  type?: string;
  category?: string;
  subCategory?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICart {
  cartId?: number;
  totalPrice?: number;
  totalCartItems?: number;
}

export interface ICartItems {
  productId?: number;
  name?: string;
  description?: string;
  imageUrl?: string;
  color?: string;
  size?: string;
  cartItemsQuantity?: number;
  cartItemsTotalPrice?: number;
}

export interface IOrder {
  productId: number;
  orderItemQuantity: number;
  orderItemTotalPrice: number | string;
  size: string;
  color: string;
  name: string;
  imageUrl: string;
}

export interface IOrders {
  orderId: string | number;
  details: IOrder[];
  totalPrice: string | number;
  createdAt: Date;
}

export type Size =
  | "US 7"
  | "US 8"
  | "US 8.5"
  | "US 9"
  | "US 9.5"
  | "US 10"
  | "US 10.5"
  | "US 11"
  | "US 11.5"
  | "US 12"
  | "US 12.5"
  | "US 13"
  | "XS"
  | "S"
  | "M"
  | "L"
  | "XL"
  | "2XL"
  | "3XL";
