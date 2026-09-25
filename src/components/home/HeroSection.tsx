import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

type HeroSectionProps = {
  locale: 'en-ae' | 'ar-ae';
};

export default async function HeroSection({
  locale,
}: HeroSectionProps) {
  const t = await getTranslations({
    locale,
    namespace: 'common',
  });

  return (
    <section className="relative overflow-hidden bg-gray-100">
      <div className="mx-auto grid min-h-[500px] max-w-7xl items-center px-6 py-16 sm:px-8 lg:grid-cols-2 lg:px-12">
        <div className="max-w-xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
            Babies & More
          </p>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            {t('heroTitle')}
          </h1>

          <p className="mt-6 max-w-lg text-base leading-7 text-gray-600 sm:text-lg">
            {t('heroDescription')}
          </p>

          <Link
            href={`/${locale}/category`}
            className="mt-8 inline-flex rounded-md bg-black px-7 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            {t('shopNow')}
          </Link>
        </div>

        <div className="mt-10 hidden lg:flex lg:justify-end">
          <div className="flex h-80 w-80 items-center justify-center rounded-full bg-white shadow-sm">
            <span className="text-center text-6xl">🧸</span>
          </div>
        </div>
      </div>
    </section>
  );
}