'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useDispatch } from 'react-redux';

import type { Product } from '@/types';
import type { AppDispatch } from '@/store/store';
import { addToCart } from '@/store/cartSlice';
import WishlistButton from '@/components/common/WishlistButton';
import SizeChart from '@/components/common/SizeChart';

type ProductActionsProps = {
  product: Product;
};

export default function ProductActions({
  product,
}: ProductActionsProps) {
  const t = useTranslations('common');
  const dispatch = useDispatch<AppDispatch>();

  const [selectedSize, setSelectedSize] = useState<
    Product['sizes'][number]
  >(product.sizes[0]);

  const [quantity, setQuantity] = useState(1);

  const isOutOfStock = product.stock === 0;

  const handleAddToCart = () => {
    if (isOutOfStock) {
      return;
    }

    dispatch(
      addToCart({
        product,
        selectedSize,
        quantity,
      }),
    );
  };

  const increaseQuantity = () => {
    setQuantity((current) =>
      Math.min(current + 1, product.stock),
    );
  };

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(current - 1, 1));
  };

  return (
    <div className="space-y-6">
      {/* Size Selection */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <label className="font-semibold">
            {t('selectSize')}
          </label>

          <SizeChart sizes={product.sizes} />
        </div>

        <div className="flex flex-wrap gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setSelectedSize(size)}
              disabled={isOutOfStock}
              className={`rounded-md border px-4 py-2 text-sm font-medium ${
                selectedSize === size
                  ? 'border-black bg-black text-white'
                  : 'border-gray-300 bg-white text-black'
              } ${
                isOutOfStock
                  ? 'cursor-not-allowed opacity-50'
                  : ''
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div>
        <label className="mb-3 block font-semibold">
          {t('quantity')}
        </label>

        <div className="flex w-fit items-center rounded-md border">
          <button
            type="button"
            onClick={decreaseQuantity}
            disabled={isOutOfStock || quantity <= 1}
            className="px-4 py-2 text-lg disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Decrease quantity"
          >
            −
          </button>

          <span className="min-w-12 text-center">
            {quantity}
          </span>

          <button
            type="button"
            onClick={increaseQuantity}
            disabled={
              isOutOfStock || quantity >= product.stock
            }
            className="px-4 py-2 text-lg disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* Stock */}
      {isOutOfStock && (
        <p className="font-medium text-red-600">
          {t('outOfStock')}
        </p>
      )}

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className="rounded-md bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {isOutOfStock
            ? t('outOfStock')
            : t('addToCart')}
        </button>

        <WishlistButton product={product} />
      </div>
    </div>
  );
}