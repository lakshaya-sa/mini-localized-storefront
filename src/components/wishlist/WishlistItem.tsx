'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useTranslations } from 'next-intl';

import type { AppDispatch } from '@/store/store';
import type { Product } from '@/types';
import { removeFromWishlist } from '@/store/wishlistSlice';
import AddToCartButton from '@/components/common/AddToCartButton';

type WishlistItemProps = {
  product: Product;
  locale: 'en-ae' | 'ar-ae';
};

export default function WishlistItem({
  product,
  locale,
}: WishlistItemProps) {
  const t = useTranslations('common');
  const dispatch = useDispatch<AppDispatch>();

  return (
    <article className="overflow-hidden rounded-lg border">
      <Link href={`/${locale}/product/${product.id}`}>
        <div className="relative aspect-square bg-gray-50">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover"
          />
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/${locale}/product/${product.id}`}>
          <h2 className="font-semibold hover:underline">
            {product.name}
          </h2>
        </Link>

        <p className="mt-2 font-medium">
          AED {product.price.toFixed(2)}
        </p>

        <div className="mt-4 flex gap-2">
          <AddToCartButton product={product} />

          <button
            type="button"
            onClick={() =>
              dispatch(removeFromWishlist(product.id))
            }
            className="flex-1 rounded border px-3 py-2 text-sm hover:bg-gray-50"
          >
            {t('removeFromWishlist')}
          </button>
        </div>
      </div>
    </article>
  );
}