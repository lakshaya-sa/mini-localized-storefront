'use client';

import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';

type CartWishlistCountProps = {
  type: 'cart' | 'wishlist';
};

export default function CartWishlistCount({
  type,
}: CartWishlistCountProps) {
  const count = useSelector((state: RootState) => {
    if (type === 'wishlist') {
      return state.wishlist.items.length;
    }

    return state.cart.items.reduce(
      (total, item) => total + item.quantity,
      0,
    );
  });

  return <span>({count})</span>;
}