import { UserInfo } from '../shared.types'

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

// Admin operations
export type UsersResponse = UserInfo[]

export interface UpdateUserRequest {
  userId: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export type UpdateUserResponse = UserInfo;