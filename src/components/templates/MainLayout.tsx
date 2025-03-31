'use client';

import React, { ReactNode } from 'react';

import AppFooter from '../molecules/AppFooter';
import AppHeader from '../molecules/AppHeader';

interface MainLayoutProps {
  children: ReactNode;
  showNav?: boolean;
}

export default function MainLayout({ children, showNav = true }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader showNav={showNav} />
      <main className="flex-grow">{children}</main>
      <AppFooter />
    </div>
  );
}
