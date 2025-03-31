import type { Metadata } from 'next';

import HeroHome from '../components/home/HeroHome';
import Newsletter from '../components/home/Newsletter';

export const metadata: Metadata = {
  title: 'Home - React FullStack Shop',
  description: 'Welcome to our e-commerce store with a wide range of products',
};

export default function HomePage() {
  return (
    <main>
      <HeroHome />
      <Newsletter />
    </main>
  );
}
