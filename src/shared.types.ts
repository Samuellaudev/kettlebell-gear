// Products
export interface Product {
  _id: string;
  name: string;
  qty?: number;
  image: ProductImage;
  price: number;
  user?: string;
  brand: string;
  category: string;
  description: string;
  rating?: number;
  numReviews?: number;
  countInStock: number;
  reviews?: Review[];
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  name: string;
  rating: number;
  comment: string;
  user: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  url: string;
  name: string;
  type: string;
  lastModified: string;
}

// Users
export interface UserInfo {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

// Carts
export type CartItem = Product;

export interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

// Orders
export interface OrderItem {
  _id: string;
  name: string;
  qty: number;
  image: ProductImage;
  price: number;
  product: Product['_id']
}
export interface Order {
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  },
  _id: string;
  user: UserInfo;
  orderItems: OrderItem[];
  paymentMethod: string;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
  updatedAt: string;
  paidAt: string;
  deliveredAt: string;
}