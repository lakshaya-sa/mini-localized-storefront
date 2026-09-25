'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useTranslations } from 'next-intl';

import type { RootState } from '@/store/store';

export default function OrderSummaryPage() {
  const params = useParams<{
    locale: 'en-ae' | 'ar-ae';
  }>();

  const locale = params.locale;
  const t = useTranslations('common');

  const order = useSelector(
    (state: RootState) => state.order.order,
  );

  if (!order) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">
          {t('orderNotFound')}
        </h1>

        <p className="mt-3 text-gray-600">
          {t('noRecentOrder')}
        </p>

        <Link
          href={`/${locale}/category`}
          className="mt-6 inline-block rounded bg-black px-5 py-3 text-white"
        >
          {t('continueShopping')}
        </Link>
      </main>
    );
  }

  const paymentMethodLabels: Record<string, string> = {
    card: t('card'),
    applePay: t('applePay'),
    cod: t('cod'),
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <div className="rounded-lg border p-6">
        <h1 className="text-3xl font-bold">
          {t('orderSummary')}
        </h1>

        <p className="mt-2 text-gray-600">
          {t('orderNumber')}: {order.orderNumber}
        </p>

        <div className="mt-8">
          <h2 className="text-xl font-semibold">
            {t('customerDetails')}
          </h2>

          <div className="mt-3 space-y-1 text-gray-700">
            <p>
              {order.customer.firstName}{' '}
              {order.customer.lastName}
            </p>

            <p>{order.customer.email}</p>
            <p>{order.customer.phone}</p>
            <p>{order.customer.address}</p>

            <p>
              {order.customer.city},{' '}
              {order.customer.postalCode}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold">
            {t('items')}
          </h2>

          <div className="mt-4 space-y-4">
            {order.items.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedSize}`}
                className="flex items-center justify-between border-b pb-4"
              >
                <div>
                  <p className="font-medium">
                    {item.product.name}
                  </p>

                  <p className="text-sm text-gray-600">
                    {t('size')}: {item.selectedSize} ·{' '}
                    {t('quantity')}: {item.quantity}
                  </p>
                </div>

                <p className="font-medium">
                  AED{' '}
                  {(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 ml-auto max-w-sm space-y-3">
          <div className="flex justify-between">
            <span>{t('subtotal')}</span>
            <span>AED {order.subtotal.toFixed(2)}</span>
          </div>

          {order.discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>{t('discount')}</span>

              <span>
                - AED {order.discount.toFixed(2)}
              </span>
            </div>
          )}

          <div className="flex justify-between border-t pt-3 text-lg font-bold">
            <span>{t('total')}</span>
            <span>AED {order.total.toFixed(2)}</span>
          </div>

          <div className="flex justify-between pt-2">
            <span>{t('paymentMethod')}</span>

            <span>
              {paymentMethodLabels[order.paymentMethod] ??
                order.paymentMethod}
            </span>
          </div>
        </div>

        <div className="mt-8">
          <Link
            href={`/${locale}/category`}
            className="inline-block rounded bg-black px-5 py-3 text-white"
          >
            {t('continueShopping')}
          </Link>
        </div>
      </div>
    </main>
  );
}