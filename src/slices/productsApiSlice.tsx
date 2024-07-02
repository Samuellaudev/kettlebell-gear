import { PRODUCTS_URL, IMAGE_UPLOAD_URL } from '../utils/constants';
import { apiSlice } from './apiSlice';
import {
  ProductsResponse,
  ProductDetailsResponse,
  UpdateProductData,
  ReviewData,
  ProductImageData,
  TopProductsResponse
} from './productApiSlice.types';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, { keyword: string;  pageNumber: string }>({
      query: ({ keyword, pageNumber }) => ({
        url: PRODUCTS_URL,
        params: { keyword, pageNumber },
      }),
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query<ProductDetailsResponse, string>({
      query: (id) => ({
        url: `${PRODUCTS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation<void, void>({
      query: () => ({
        url: `${PRODUCTS_URL}`,
        method: 'POST',
      }),
      invalidatesTags: ['Product'],
    }),
    updateProduct: builder.mutation<void, UpdateProductData>({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Product'],
    }),
    deleteProduct: builder.mutation<void, string>({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: 'DELETE',
      }),
    }),
    uploadProductImage: builder.mutation<ProductImageData, FormData>({
      query: (data) => ({
        url: `${IMAGE_UPLOAD_URL}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Product'],
    }),
    // getProductImage: builder.query<ProductImageData, string>({
    //   query: (imgName) => ({
    //     url: `${AWS_S3_GET_URL}/${imgName}`,
    //   }),
    //   keepUnusedDataFor: 5,
    // }),
    createReview: builder.mutation<void, ReviewData>({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}/reviews`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Product'],
    }),
    getTopProducts: builder.query<TopProductsResponse, void>({
      query: () => ({
        url: `${ PRODUCTS_URL }/top`
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useUploadProductImageMutation,
  // useGetProductImageQuery,
  useCreateReviewMutation,
  useGetTopProductsQuery
} = productsApiSlice;