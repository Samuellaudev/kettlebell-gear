import { Product, Review, ProductImage } from '../shared.types'

export interface ProductsResponse {
  products: Product[];
  page: number;
  pages: number;
}

export type ProductDetailsResponse = Product;

export interface UpdateProductData {
  productId: Product['_id'];
  name: Product['name'];
  price: Product['price'];
  image: ProductImage;
  brand: Product['brand'];
  category: Product['category'];
  description: Product['description'];
  countInStock: Product['countInStock'];
}

export interface ReviewData {
  productId: Product['_id'];
  rating: Review['rating'];
  comment: Review['comment'];
}

export interface ProductImageData {
  message: string;
  url: string;
}

export type TopProductsResponse = Product[];