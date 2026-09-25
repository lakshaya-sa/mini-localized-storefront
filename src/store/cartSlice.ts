import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '@/types';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: Product['sizes'][number];
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{
        product: Product;
        selectedSize: Product['sizes'][number];
        quantity?: number;
      }>,
    ) => {
      const { product, selectedSize, quantity = 1, } = action.payload;

      const existingItem = state.items.find(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === selectedSize,
      );

      if (existingItem) {
        existingItem.quantity = Math.min(existingItem.quantity + quantity,product.stock,);
      } else {
        state.items.push({
          product,
          quantity: Math.min(quantity, product.stock),
          selectedSize,
        });
      }
    },

    removeFromCart: (
      state,
      action: PayloadAction<{
        productId: string;
        selectedSize: Product['sizes'][number];
      }>,
    ) => {
      state.items = state.items.filter(
        (item) =>
          !(
            item.product.id === action.payload.productId &&
            item.selectedSize === action.payload.selectedSize
          ),
      );
    },

    increaseQuantity: (
      state,
      action: PayloadAction<{
        productId: string;
        selectedSize: Product['sizes'][number];
      }>,
    ) => {
      const item = state.items.find(
        (item) =>
          item.product.id === action.payload.productId &&
          item.selectedSize === action.payload.selectedSize,
      );

      if (item && item.quantity < item.product.stock) {
        item.quantity += 1;
      }
    },

    decreaseQuantity: (
      state,
      action: PayloadAction<{
        productId: string;
        selectedSize: Product['sizes'][number];
      }>,
    ) => {
      const item = state.items.find(
        (item) =>
          item.product.id === action.payload.productId &&
          item.selectedSize === action.payload.selectedSize,
      );

      if (!item) {
        return;
      }

      if (item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

