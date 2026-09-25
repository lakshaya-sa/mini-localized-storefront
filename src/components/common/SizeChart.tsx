'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

type SizeChartProps = {
  sizes: string[];
};

const sizeChart = [
  {
    size: '2Y',
    age: '2–3 yrs',
    height: '92–98 cm',
    chest: '54 cm',
  },
  {
    size: '4Y',
    age: '4–5 yrs',
    height: '104–110 cm',
    chest: '58 cm',
  },
  {
    size: '6Y',
    age: '6–7 yrs',
    height: '116–122 cm',
    chest: '62 cm',
  },
  {
    size: '8Y',
    age: '8–9 yrs',
    height: '128–134 cm',
    chest: '66 cm',
  },
];

export default function SizeChart({
  sizes,
}: SizeChartProps) {
  const t = useTranslations('common');
  const [isOpen, setIsOpen] = useState(false);

  const availableSizes = sizeChart.filter((item) =>
    sizes.includes(item.size),
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="text-sm font-medium underline"
      >
        {t('sizeChart')}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-2xl rounded-lg bg-white p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {t('sizeChart')}
              </h2>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-2xl"
                aria-label={t('close')}
              >
                ×
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="p-3 text-start">
                      {t('size')}
                    </th>
                    <th className="p-3 text-start">
                      {t('age')}
                    </th>
                    <th className="p-3 text-start">
                      {t('height')}
                    </th>
                    <th className="p-3 text-start">
                      {t('chest')}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {availableSizes.map((item) => (
                    <tr
                      key={item.size}
                      className="border-b"
                    >
                      <td className="p-3">{item.size}</td>
                      <td className="p-3">{item.age}</td>
                      <td className="p-3">
                        {item.height}
                      </td>
                      <td className="p-3">
                        {item.chest}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}