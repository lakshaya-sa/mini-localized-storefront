'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '@/store/store';
import { clearCart } from '@/store/cartSlice';
import { removeCoupon } from '@/store/couponSlice';
import { createOrder } from '@/store/orderSlice';

type CheckoutFormProps = {
  locale: 'en-ae' | 'ar-ae';
};

export default function CheckoutForm({
  locale,
}: CheckoutFormProps) {
  const t = useTranslations('common');
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

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

  const [paymentMethod, setPaymentMethod] = useState('card');

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

const handleSubmit = (
  event: React.FormEvent<HTMLFormElement>,
) => {
  event.preventDefault();

  const orderNumber = `ORD-${form.email.replace(/[^a-zA-Z0-9]/g, '').slice(0, 6).toUpperCase()}-${items.length}`;

  dispatch(
    createOrder({
      orderNumber,
      items,
      customer: form,
      paymentMethod,
      subtotal,
      discount,
      total,
    }),
  );

  dispatch(clearCart());
  dispatch(removeCoupon());

  router.push(`/${locale}/order-summary`);
};

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-8 lg:grid-cols-[1fr_380px]"
    >
      <section className="space-y-6">
        <div className="rounded-lg border p-6">
          <h2 className="text-xl font-semibold">
            {t('customerInformation')}
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder={t('firstName')}
              required
              className="rounded border px-3 py-2"
            />

            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder={t('lastName')}
              required
              className="rounded border px-3 py-2"
            />

            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder={t('email')}
              required
              className="rounded border px-3 py-2"
            />

            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder={t('phone')}
              required
              className="rounded border px-3 py-2"
            />
          </div>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="text-xl font-semibold">
            {t('shippingAddress')}
          </h2>

          <div className="mt-5 space-y-4">
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder={t('address')}
              required
              className="w-full rounded border px-3 py-2"
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder={t('city')}
                required
                className="rounded border px-3 py-2"
              />

              <input
                name="postalCode"
                value={form.postalCode}
                onChange={handleChange}
                placeholder={t('postalCode')}
                required
                className="rounded border px-3 py-2"
              />
            </div>
          </div>
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="text-xl font-semibold">
            {t('paymentMethod')}
          </h2>

          <div className="mt-5 space-y-3">
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={(event) =>
                  setPaymentMethod(event.target.value)
                }
              />
              <span>{t('card')}</span>
            </label>

            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="radio"
                name="paymentMethod"
                value="applePay"
                checked={paymentMethod === 'applePay'}
                onChange={(event) =>
                  setPaymentMethod(event.target.value)
                }
              />
              <span>{t('applePay')}</span>
            </label>

            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={paymentMethod === 'cod'}
                onChange={(event) =>
                  setPaymentMethod(event.target.value)
                }
              />
              <span>{t('cod')}</span>
            </label>
          </div>
        </div>
      </section>

      <aside className="h-fit rounded-lg border p-6">
        <h2 className="text-xl font-semibold">
          {t('orderSummary')}
        </h2>

        <div className="mt-6 space-y-4">
          <div className="flex justify-between">
            <span>{t('subtotal')}</span>
            <span>AED {subtotal.toFixed(2)}</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>{t('discount')}</span>
              <span>- AED {discount.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between border-t pt-4 text-lg font-bold">
            <span>{t('total')}</span>
            <span>AED {total.toFixed(2)}</span>
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full rounded bg-black px-6 py-3 text-white"
        >
          {t('placeOrder')}
        </button>
      </aside>
    </form>
  );
}