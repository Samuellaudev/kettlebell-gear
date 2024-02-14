// Products
export interface Product {
  _id: string;
  user: string;
  name: string;
  image: ProductImage;
  brand: string;
  category: string;
  description: string;
  rating: number;
  numReviews: number;
  price: number;
  qty?: number;
  countInStock: number;
  reviews: Review[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  name: string;
  rating: number;
  comment: string;
  user: string;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductImage {
  name: string;
  type: string;
  lastModified: Date;
}

// Users

export interface UserInfo {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}
export type LoginResponse = UserInfo;

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}
export type RegisterResponse = UserInfo;

export interface UpdateProfileRequest {
  name: string;
  email: string;
  password: string;
}
export type UpdateProfileResponse = UserInfo;