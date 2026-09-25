import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from '@/components/common/Header';
import StoreProvider from '@/store/provider';

type Props = {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export default async function LocaleLayout({
  children,
  params,
}: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages({
    locale,
  });

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
    >
      <StoreProvider>
        <div
          dir={locale === 'ar-ae' ? 'rtl' : 'ltr'}
          lang={locale}
          className="min-h-screen"
        >
          <Header locale={locale} />

          {children}
        </div>
      </StoreProvider>
    </NextIntlClientProvider>
  );
}