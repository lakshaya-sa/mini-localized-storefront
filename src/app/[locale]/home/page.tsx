import HeroSection from '@/components/home/HeroSection';

type Props = {
  params: Promise<{
    locale: 'en-ae' | 'ar-ae';
  }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  return (
    <main>
      <HeroSection locale={locale} />
    </main>
  );
}