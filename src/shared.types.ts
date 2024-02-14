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