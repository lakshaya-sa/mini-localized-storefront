'use client';

import Image from 'next/image';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/store/store';
import { useTranslations } from 'next-intl';
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  type CartItem as CartItemType,
} from '@/store/cartSlice';

type CartItemProps = {
  item: CartItemType;
};

export default function CartItem({ item }: CartItemProps) {
  const dispatch = useDispatch<AppDispatch>();

  const { product, quantity, selectedSize } = item;

  const t = useTranslations('common');

  return (
    <div className="flex gap-4 border-b py-5">
      <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-lg border">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="112px"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h2 className="font-semibold">{product.name}</h2>

          <p className="mt-1 text-sm text-gray-600">
            {t('size')}: {item.selectedSize} 
          </p>

          <p className="mt-1 font-medium">
            AED {product.price}
          </p>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center rounded border">
            <button
              type="button"
              onClick={() =>
                dispatch(
                  decreaseQuantity({
                    productId: product.id,
                    selectedSize,
                  }),
                )
              }
              className="px-3 py-1"
            >
              -
            </button>

            <span className="px-3">{quantity}</span>

            <button
              type="button"
              onClick={() =>
                dispatch(
                  increaseQuantity({
                    productId: product.id,
                    selectedSize,
                  }),
                )
              }
              disabled={quantity >= product.stock}
              className="px-3 py-1 disabled:cursor-not-allowed disabled:opacity-40"
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={() =>
              dispatch(
                removeFromCart({
                  productId: product.id,
                  selectedSize,
                }),
              )
            }
            className="text-sm text-red-600 hover:underline"
          >
            {t('remove')}
          </button>
        </div>
      </div>
    </div>
  );
}