'use client';

import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/store/store';
import { addToCart } from '@/store/cartSlice';
import type { Product } from '@/types';
import { useTranslations } from 'next-intl';

type AddToCartButtonProps = {
  product: Product;
};

export default function AddToCartButton({
  product,
}: AddToCartButtonProps) {
  const dispatch = useDispatch<AppDispatch>();

  const isOutOfStock = product.stock === 0;

  const t = useTranslations('common');

  const handleAddToCart = () => {
    if (isOutOfStock) {
      return;
    }

    dispatch(
      addToCart({
        product,
        selectedSize: product.sizes[0],
      }),
    );
  };

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      disabled={isOutOfStock}
      className="flex-1 rounded bg-black px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-gray-300"
    >
      {t('addToCart')}
    </button>
  );
}