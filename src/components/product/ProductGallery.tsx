'use client';

import Image from 'next/image';
import { useState } from 'react';

type ProductGalleryProps = {
  images: string[];
  productName: string;
};

export default function ProductGallery({
  images,
  productName,
}: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="overflow-hidden rounded-lg border bg-gray-50">
        <Image
          src={selectedImage}
          alt={productName}
          width={600}
          height={600}
          className="h-[400px] w-full object-contain"
          priority
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 overflow-x-auto">
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => setSelectedImage(image)}
            className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-md border-2 ${
              selectedImage === image
                ? 'border-black'
                : 'border-gray-200'
            }`}
          >
            <Image
              src={image}
              alt={`${productName} ${index + 1}`}
              fill
              sizes="80px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}