'use client';

import React from 'react';

import Header from '../organisms/Header';

interface AppHeaderProps {
  showNav?: boolean;
}

export default function AppHeader({ showNav = true }: AppHeaderProps) {
  return <Header showNav={showNav} />;
}
