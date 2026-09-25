import { getTranslations } from 'next-intl/server';
import ProductCard from '@/components/common/ProductCard';
import { products } from '@/data/products';

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function CategoryPage({
  params,
}: Props) {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: 'common',
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          {t('category')}
        </h1>

        <p className="mt-2 text-gray-600">
          {products.length} products
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            locale={locale as 'en-ae' | 'ar-ae'}
          />
        ))}
      </div>
    </main>
  );
}