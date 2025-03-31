import '../styles/globals.css';

import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';

import MainLayout from '../components/templates/MainLayout';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  themeColor: '#ffffff',
};

export const metadata: Metadata = {
  title: 'React FullStack Shop',
  description: 'A full-stack e-commerce shop built with React',
  robots: 'index, follow',
  openGraph: {
    title: 'React FullStack Shop',
    description: 'A full-stack e-commerce shop built with React',
    type: 'website',
  },
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}
