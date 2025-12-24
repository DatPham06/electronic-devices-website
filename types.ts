export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  features: string[];
  isNew?: boolean;
  isSale?: boolean;
  rating?: number;
  reviews?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  name: string;
  email: string;
  role: 'admin' | 'user';
  phone?: string;
  address?: string;
  avatar?: string;
  joinedDate?: string;
}

export enum Page {
  HOME = 'HOME',
  PRODUCT_DETAIL = 'PRODUCT_DETAIL',
  CART = 'CART',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  CATALOG = 'CATALOG',
  TECH_3D = 'TECH_3D',
  SUPPORT = 'SUPPORT',
  ADMIN = 'ADMIN',
  PROFILE = 'PROFILE',
  CHECKOUT = 'CHECKOUT'
}