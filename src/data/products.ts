import type { Product } from '@/types';

export const products: Product[] = [
  {
    id: 'p001',
    name: 'Baby Cotton T-Shirt',
    price: 45,
    originalPrice: 60,
    badge: 'sale',
    stock: 10,
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea',
    images: [
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea',
      'https://images.unsplash.com/photo-1503919545889-aef636e10ad4',
    ],
    description:
      'Soft and comfortable cotton t-shirt designed for everyday wear.',
    sizes: ['2Y', '4Y', '6Y', '8Y'],
  },
  {
    id: 'p002',
    name: 'Baby Denim Jacket',
    price: 85,
    originalPrice: 110,
    badge: 'bestSeller',
    stock: 15,
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea',
    images: [
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea',
      'https://images.unsplash.com/photo-1522771930-78848d9293e8',
    ],
    description:
      'Stylish denim jacket made with comfortable fabric for little ones.',
    sizes: ['2Y', '4Y', '6Y', '8Y'],
  },
  {
    id: 'p003',
    name: 'Baby Summer Dress',
    price: 70,
    originalPrice: 90,
    badge: 'new',
    stock: 20,
    image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7',
    images: [
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7',
      'https://images.unsplash.com/photo-1491013516836-7db643ee125a',
    ],
    description:
      'Lightweight summer dress designed for comfort and easy movement.',
    sizes: ['2Y', '4Y', '6Y', '8Y'],
  },
  {
    id: 'p004',
    name: 'Baby Hoodie',
    price: 65,
    originalPrice: 80,
    badge: 'limitedStock',
    stock: 4,
    image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4',
    images: [
      'https://images.unsplash.com/photo-1503919545889-aef636e10ad4',
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea',
    ],
    description:
      'Warm and soft hoodie perfect for cooler days.',
    sizes: ['2Y', '4Y', '6Y', '8Y'],
  },
  {
    id: 'p005',
    name: 'Baby Jogger Pants',
    price: 55,
    originalPrice: 70,
    badge: 'sale',
    stock: 12,
    image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8',
    images: [
      'https://images.unsplash.com/photo-1522771930-78848d9293e8',
      'https://images.unsplash.com/photo-1491013516836-7db643ee125a',
    ],
    description:
      'Comfortable jogger pants suitable for active little ones.',
    sizes: ['2Y', '4Y', '6Y', '8Y'],
  },
  {
    id: 'p006',
    name: 'Baby Knit Sweater',
    price: 75,
    originalPrice: 95,
    badge: 'bestSeller',
    stock: 8,
    image: 'https://images.unsplash.com/photo-1491013516836-7db643ee125a',
    images: [
      'https://images.unsplash.com/photo-1491013516836-7db643ee125a',
      'https://images.unsplash.com/photo-1503919545889-aef636e10ad4',
    ],
    description:
      'Soft knit sweater that keeps children warm and comfortable.',
    sizes: ['2Y', '4Y', '6Y', '8Y'],
  },
  {
    id: 'p007',
    name: 'Baby Casual Shorts',
    price: 35,
    originalPrice: 45,
    badge: 'new',
    stock: 25,
    image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4',
    images: [
      'https://images.unsplash.com/photo-1503919545889-aef636e10ad4',
      'https://images.unsplash.com/photo-1522771930-78848d9293e8',
    ],
    description:
      'Lightweight casual shorts for everyday comfort.',
    sizes: ['2Y', '4Y', '6Y', '8Y'],
  },
  {
    id: 'p008',
    name: 'Baby Party Outfit',
    price: 120,
    originalPrice: 150,
    badge: 'sale',
    stock: 6,
    image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7',
    images: [
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7',
      'https://images.unsplash.com/photo-1491013516836-7db643ee125a',
    ],
    description:
      'Elegant outfit designed for birthdays and special occasions.',
    sizes: ['2Y', '4Y', '6Y', '8Y'],
  },
  {
    id: 'p009',
    name: 'Baby Cotton Romper',
    price: 50,
    originalPrice: 65,
    badge: 'limitedStock',
    stock: 3,
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea',
    images: [
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea',
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7',
    ],
    description:
      'Soft cotton romper designed for all-day comfort.',
    sizes: ['2Y', '4Y', '6Y'],
  },
  {
    id: 'p010',
    name: 'Baby Winter Coat',
    price: 140,
    originalPrice: 140,
    badge: 'outOfStock',
    stock: 0,
    image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4',
    images: [
      'https://images.unsplash.com/photo-1503919545889-aef636e10ad4',
      'https://images.unsplash.com/photo-1491013516836-7db643ee125a',
    ],
    description:
      'Warm winter coat designed to keep little ones comfortable.',
    sizes: ['2Y', '4Y', '6Y', '8Y'],
  },
];