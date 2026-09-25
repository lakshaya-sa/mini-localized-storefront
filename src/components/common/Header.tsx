import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import CartWishlistCount from './CartWishlistCount';

type HeaderProps = {
  locale: 'en-ae' | 'ar-ae';
};

export default async function Header({
  locale,
}: HeaderProps) {
  const t = await getTranslations({
    locale,
    namespace: 'common',
  });

  const otherLocale =
    locale === 'en-ae' ? 'ar-ae' : 'en-ae';

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link
          href={`/${locale}/home`}
          className="text-xl font-bold"
        >
          Babies & More
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href={`/${locale}/home`}
            className="hover:text-gray-600"
          >
            {t('home')}
          </Link>

          <Link
            href={`/${locale}/category`}
            className="hover:text-gray-600"
          >
            {t('category')}
          </Link>

          <Link
            href={`/${locale}/wishlist`}
            className="hover:text-gray-600"
          >
            {t('wishlist')}{' '}
            <CartWishlistCount type="wishlist" />
          </Link>

          <Link
            href={`/${locale}/cart`}
            className="hover:text-gray-600"
          >
            {t('cart')}{' '}
            <CartWishlistCount type="cart" />
          </Link>

          <Link
            href={`/${otherLocale}/home`}
            className="rounded border px-3 py-1 text-sm"
          >
            {otherLocale === 'ar-ae'
              ? 'العربية'
              : 'English'}
          </Link>
        </nav>
      </div>
    </header>
  );
}