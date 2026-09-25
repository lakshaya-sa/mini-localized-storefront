import { getTranslations } from 'next-intl/server';
import type { ProductBadge as ProductBadgeType } from '@/types';

type ProductBadgeProps = {
  badge: ProductBadgeType;
};

export default async function ProductBadge({
  badge,
}: ProductBadgeProps) {
  const t = await getTranslations('common');

  const badgeLabels: Record<ProductBadgeType, string> = {
    new: t('new'),
    bestSeller: t('bestSeller'),
    sale: t('sale'),
    limitedStock: t('limitedStock'),
    outOfStock: t('outOfStock'),
  };

  return (
    <span className="rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">
      {badgeLabels[badge]}
    </span>
  );
}