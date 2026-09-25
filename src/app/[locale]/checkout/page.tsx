import CheckoutForm from '@/components/checkout/CheckoutForm';
import { getTranslations } from 'next-intl/server';

type CheckoutPageProps = {
  params: Promise<{
    locale: 'en-ae' | 'ar-ae';
  }>;
};

export default async function CheckoutPage({
  params,
}: CheckoutPageProps) {
  const { locale } = await params;
  const t = await getTranslations('common');

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-bold">
        {t('checkout')}
      </h1>

      <div className="mt-8">
        <CheckoutForm locale={locale} />
      </div>
    </main>
  );
}