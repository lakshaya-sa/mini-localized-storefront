import Image from 'next/image';
import Link from 'next/link';
import ProductBadge from './ProductBadge';
import WishlistButton from './WishlistButton';
import AddToCartButton from './AddToCartButton';
import type { Product } from '@/types';
import { useTranslations } from 'next-intl';

type ProductCardProps = {
  product: Product;
  locale: 'en-ae' | 'ar-ae';
};

function getDiscountPercentage(
  price: number,
  originalPrice: number,
) {
  if (originalPrice <= price) {
    return 0;
  }

  return Math.round(
    ((originalPrice - price) / originalPrice) * 100,
  );
}

export default function ProductCard({
  product,
  locale,
}: ProductCardProps) {
  const discountPercentage = getDiscountPercentage(
    product.price,
    product.originalPrice,
  );
  const t = useTranslations('common');
  const isOutOfStock = product.stock === 0;

  return (
    <article className="group overflow-hidden rounded-lg border bg-white">
      <Link href={`/${locale}/product/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          <div className="absolute left-3 top-3">
            <ProductBadge badge={product.badge} />
          </div>
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/${locale}/product/${product.id}`}>
          <h2 className="font-semibold hover:underline">
            {product.name}
          </h2>
        </Link>

        <div className="mt-2 flex items-center gap-2">
          <span className="font-bold">
            AED {product.price}
          </span>

          {product.originalPrice > product.price && (
            <span className="text-sm text-gray-500 line-through">
              AED {product.originalPrice}
            </span>
          )}
        </div>

        {discountPercentage > 0 && (
          <p className="mt-1 text-sm font-medium">
            {discountPercentage}% OFF
          </p>
        )}

        <p className="mt-2 text-sm">
          {isOutOfStock
            ? t('outOfStock')
            : product.stock <= 5
              ? t('onlyLeft', { count: product.stock })
              : t('inStock')} 
        </p>

        <div className="mt-4 flex gap-2">
          <WishlistButton product={product} />

          <AddToCartButton product={product} />
        </div>
      </div>
    </article>
  );
}