import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CartItem } from './cartSlice';

interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}

interface OrderState {
  order: {
    orderNumber: string;
    items: CartItem[];
    customer: CustomerInfo;
    paymentMethod: string;
    subtotal: number;
    discount: number;
    total: number;
  } | null;
}

const initialState: OrderState = {
  order: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    createOrder: (
      state,
      action: PayloadAction<OrderState['order']>,
    ) => {
      state.order = action.payload;
    },

    clearOrder: (state) => {
      state.order = null;
    },
  },
});

export const { createOrder, clearOrder } = orderSlice.actions;

export default orderSlice.reducer;