'use client';

import { use } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useTranslations } from 'next-intl';
import CartItem from '@/components/cart/CartItem';
import type { RootState } from '@/store/store';
import CouponForm from '@/components/cart/CouponForm';

type CartPageProps = {
  params: Promise<{
    locale: 'en-ae' | 'ar-ae';
  }>;
};

export default function CartPage({ params }: CartPageProps) {
  const t = useTranslations('common');

  const { locale } = use(params);

  const items = useSelector((state: RootState) => state.cart.items);

  const discountPercentage = useSelector(
    (state: RootState) => state.coupon.discountPercentage,
  );

  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  const discount =
    (subtotal * discountPercentage) / 100;

  const total = subtotal - discount;

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="text-3xl font-bold">{t('cart')}</h1>

        <div className="mt-10 rounded-lg border p-8 text-center">
          <p className="text-gray-600">{t('emptyCart')}</p>

          <Link
            href={`/${locale}/category`}
            className="mt-5 inline-block rounded bg-black px-6 py-3 text-white"
          >
            {t('continueShopping')}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-bold">{t('cart')}</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <section className="rounded-lg border px-5">
          {items.map((item) => (
            <CartItem
              key={`${item.product.id}-${item.selectedSize}`}
              item={item}
            />
          ))}
        </section>

        <aside className="h-fit rounded-lg border p-6">
          <h2 className="text-xl font-semibold">
            {t('orderSummary')}
          </h2>

          <div className="mt-6 flex justify-between">
            <span>{t('subtotal')}</span>
            <span>AED {subtotal.toFixed(2)}</span>
          </div>

          <CouponForm subtotal={subtotal} />

{discount > 0 && (
  <div className="mt-4 flex justify-between text-green-600">
    <span>{t('discount')}</span>
    <span>- AED {discount.toFixed(2)}</span>
  </div>
)}

<div className="mt-4 flex justify-between border-t pt-4 text-lg font-bold">
  <span>{t('total')}</span>
  <span>AED {total.toFixed(2)}</span>
</div>
            
          <Link
            href={`/${locale}/checkout`}
            className="mt-6 block rounded bg-black px-6 py-3 text-center text-white"
          >
            {t('checkout')}
          </Link>
        </aside>
      </div>
    </main>
  );
}