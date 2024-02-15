import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';
import { CartItem, ShippingAddress } from '../shared.types';
import { PaymentResult } from './cartSlice.types'

export interface CartState {
  cartItems: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  paymentResult?: PaymentResult;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt: Date;
  isDelivered: boolean;
  deliveredAt: Date;
}

const initialState: CartState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart')!)
  : {
    cartItems: [],
    shippingAddress: {},
    paymentMethod: 'PayPal',
  };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;

      const existingItemIndex = state.cartItems.findIndex(item => item._id === newItem._id);

      if (existingItemIndex !== -1) {
        state.cartItems[existingItemIndex] = newItem;
      } else {
        state.cartItems = [...state.cartItems, newItem]
      }

      return updateCart(state);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const itemId = action.payload

      state.cartItems = state.cartItems.filter((x) => x._id !== itemId);
      
      return updateCart(state);
    },
    resetCart: (state) => initialState,
    saveShippingAddress: (state, action: PayloadAction<ShippingAddress>) => {
      state.shippingAddress = action.payload
      localStorage.setItem('cart', JSON.stringify(state))
    },
    savePaymentMethod: (state, action: PayloadAction<string>) => {
      state.paymentMethod = action.payload;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    clearCartItems: (state) => {
      state.cartItems = []
      localStorage.setItem('cart', JSON.stringify(state))
    },
  }
})

export const {
  addToCart,
  removeFromCart,
  resetCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems
} = cartSlice.actions

export default cartSlice.reducer;