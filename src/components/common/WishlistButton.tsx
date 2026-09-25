'use client';

import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store/store';
import {
  toggleWishlist,
} from '@/store/wishlistSlice';
import type { Product } from '@/types';

type WishlistButtonProps = {
  product: Product;
};

export default function WishlistButton({
  product,
}: WishlistButtonProps) {
  const dispatch = useDispatch<AppDispatch>();

  const isInWishlist = useSelector((state: RootState) =>
    state.wishlist.items.some(
      (item) => item.id === product.id,
    ),
  );

  return (
    <button
      type="button"
      onClick={() => dispatch(toggleWishlist(product))}
      aria-label={
        isInWishlist
          ? 'Remove from wishlist'
          : 'Add to wishlist'
      }
      className={`flex h-10 w-10 items-center justify-center rounded border text-xl ${
        isInWishlist
          ? 'border-black bg-black text-white'
          : 'bg-white'
      }`}
    >
      {isInWishlist ? '♥' : '♡'}
    </button>
  );
}