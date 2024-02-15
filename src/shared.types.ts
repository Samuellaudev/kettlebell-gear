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
  name: string;
  qty: number;
  image: string;
  price: number;
  product: Product['_id']
  _id: string;
}
export interface Order {
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  },
  _id: string;
  user: {
    name: UserInfo['name'];
    _id: UserInfo['_id']
  }
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