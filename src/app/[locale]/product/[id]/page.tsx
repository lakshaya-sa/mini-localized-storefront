import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import ProductBadge from '@/components/common/ProductBadge';
import ProductGallery from '@/components/product/ProductGallery';
import ProductActions from '@/components/product/ProductActions';
import { products } from '@/data/products';

type Props = {
  params: Promise<{
    locale: string;
    id: string;
  }>;
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

export default async function ProductPage({
  params,
}: Props) {
  const { locale, id } = await params;

  const product = products.find(
    (item) => item.id === id,
  );

  if (!product) {
    notFound();
  }

  const t = await getTranslations({
    locale,
    namespace: 'common',
  });

  const discountPercentage =
    getDiscountPercentage(
      product.price,
      product.originalPrice,
    );

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        <ProductGallery
          images={product.images}
          productName={product.name}
        />

        <div className="space-y-6">
          <div className="relative w-fit">
            <ProductBadge badge={product.badge} />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              {product.name}
            </h1>

            <p className="mt-4 text-gray-600">
              {product.description}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold">
              AED {product.price}
            </span>

            {product.originalPrice >
              product.price && (
              <>
                <span className="text-lg text-gray-500 line-through">
                  AED {product.originalPrice}
                </span>

                <span className="font-medium">
                  {discountPercentage}% OFF
                </span>
              </>
            )}
          </div>

          <div>
            <p className="font-medium">
              {product.stock === 0
                ? t('outOfStock')
                : product.stock <= 5
                  ? `Only ${product.stock} left`
                  : 'In Stock'}
            </p>
          </div>

          <ProductActions product={product} />
        </div>
      </div>
    </main>
  );
}