export type ProductBadge =
  | 'new'
  | 'bestSeller'
  | 'sale'
  | 'limitedStock'
  | 'outOfStock';

export type ProductSize = '2Y' | '4Y' | '6Y' | '8Y';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  badge: ProductBadge;
  stock: number;
  image: string;
  images: string[];
  description: string;
  sizes: ProductSize[];
}

export type CouponCode = 'SAVE10' | 'WELCOME20' | 'BABY15';

export interface Coupon {
  code: CouponCode;
  discountPercentage: number;
  minimumOrderValue: number;
}