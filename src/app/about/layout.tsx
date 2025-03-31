import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Developer - React Shop',
  description: 'Learn more about the developer and technologies used in this project',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
