'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslations } from 'next-intl';

import type { AppDispatch, RootState } from '@/store/store';
import { applyCoupon, removeCoupon } from '@/store/couponSlice';
import { coupons } from '@/data/coupons';

type CouponFormProps = {
  subtotal: number;
};

export default function CouponForm({ subtotal }: CouponFormProps) {
  const t = useTranslations('common');
  const dispatch = useDispatch<AppDispatch>();

  const appliedCoupon = useSelector(
    (state: RootState) => state.coupon,
  );

  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleApply = () => {
    const normalizedCode = code.trim().toUpperCase();

    const coupon = coupons.find(
      (item) => item.code === normalizedCode,
    );

    if (!coupon) {
      setError(t('invalidCoupon'));
      return;
    }

    if (
      coupon.minimumOrderValue &&
      subtotal < coupon.minimumOrderValue
    ) {
      setError(
        `${t('minimumOrderValue')} AED ${coupon.minimumOrderValue}`,
      );
      return;
    }

    dispatch(
      applyCoupon({
        code: coupon.code,
        discountPercentage: coupon.discountPercentage,
      }),
    );

    setError('');
    setCode('');
  };

  const handleRemove = () => {
    dispatch(removeCoupon());
    setError('');
  };

  if (appliedCoupon.code) {
    return (
      <div className="mt-6 rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">{t('couponApplied')}</p>

            <p className="text-sm text-gray-600">
              {appliedCoupon.code} —{' '}
              {appliedCoupon.discountPercentage}% off
            </p>
          </div>

          <button
            type="button"
            onClick={handleRemove}
            className="text-sm text-red-600 hover:underline"
          >
            {t('removeCoupon')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-lg border p-4">
      <label
        htmlFor="coupon"
        className="mb-2 block font-medium"
      >
        {t('applyCoupon')}
      </label>

      <div className="flex gap-2">
        <input
          id="coupon"
          type="text"
          value={code}
          onChange={(event) => {
            setCode(event.target.value);
            setError('');
          }}
          placeholder="SAVE10"
          className="min-w-0 flex-1 rounded border px-3 py-2 uppercase outline-none focus:border-black"
        />

        <button
          type="button"
          onClick={handleApply}
          className="rounded bg-black px-4 py-2 text-white"
        >
          {t('apply')}
        </button>
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}