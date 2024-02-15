import { fetchBaseQuery, createApi, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../utils/constants';
import { logout } from './authSlice';

interface BaseQueryArgs {
  url: string;
  method?: string;
  body?: unknown;
  params?: Record<string, unknown>;
}

const baseQueryWithAuth: BaseQueryFn<BaseQueryArgs> = async(args, api, extra) => {
  const result = await fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include'
  })(args, api, extra);

  if (result.error && result.error.status === 401) {
    api.dispatch(logout());
  }
  return result;
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithAuth,
  tagTypes: ['Product', 'Order', 'User'],
  endpoints: (builder) => ({}),
});