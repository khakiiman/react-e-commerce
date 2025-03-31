import { ClientOnly } from './client';
export const dynamic = 'force-static';

export function generateStaticParams() {
  return [{ slug: ['home'] }];
}

export default function Page() {
  return <ClientOnly />;
}
