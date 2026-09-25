import type { Coupon } from '@/types';

export const coupons: Coupon[] = [
  {
    code: 'SAVE10',
    discountPercentage: 10,
    minimumOrderValue: 0,
  },
  {
    code: 'WELCOME20',
    discountPercentage: 20,
    minimumOrderValue: 200,
  },
  {
    code: 'BABY15',
    discountPercentage: 15,
    minimumOrderValue: 100,
  },
];