'use client';

import { use } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useTranslations } from 'next-intl';

import type { RootState } from '@/store/store';
import WishlistItem from '@/components/wishlist/WishlistItem';

type WishlistPageProps = {
  params: Promise<{
    locale: 'en-ae' | 'ar-ae';
  }>;
};

export default function WishlistPage({
  params,
}: WishlistPageProps) {
  const { locale } = use(params);
  const t = useTranslations('common');

  const products = useSelector(
    (state: RootState) => state.wishlist.items,
  );

  if (products.length === 0) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="text-3xl font-bold">
          {t('wishlist')}
        </h1>

        <div className="mt-10 rounded-lg border p-8 text-center">
          <p className="text-gray-600">
            {t('emptyWishlist')}
          </p>

          <Link
            href={`/${locale}/category`}
            className="mt-5 inline-block rounded bg-black px-6 py-3 text-white"
          >
            {t('category')}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-bold">
        {t('wishlist')}
      </h1>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <WishlistItem
            key={product.id}
            product={product}
            locale={locale}
          />
        ))}
      </div>
    </main>
  );
}