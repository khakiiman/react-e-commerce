'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import React, { ReactNode } from 'react';

interface NavLinkProps {
  href: string;
  icon: ReactNode;
  label: string;
  isActive?: boolean;
  isExternal?: boolean;
}

const navItemVariants = {
  initial: { opacity: 0, y: -10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
  hover: {
    y: -3,
    scale: 1.05,
    transition: {
      duration: 0.2,
      type: 'spring',
      stiffness: 400,
      damping: 10,
    },
  },
  tap: { scale: 0.95 },
};

export default function NavLink({
  href,
  icon,
  label,
  isActive = false,
  isExternal = false,
}: NavLinkProps) {
  const linkContent = (
    <>
      {icon}
      <span className="text-xs">{label}</span>
      {isActive && (
        <motion.span
          layoutId="activeIndicator"
          className="block w-full h-0.5 mt-1 bg-gray-900 rounded-full dark:bg-gray-100"
        ></motion.span>
      )}
    </>
  );

  const className = `flex flex-col items-center gap-1 transition-colors ${
    isActive
      ? 'text-gray-900 dark:text-white font-medium'
      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
  }`;

  return (
    <motion.div
      variants={navItemVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      data-testid="nav-link"
    >
      {isExternal ? (
        <a
          href={href}
          className={className}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
        >
          {linkContent}
        </a>
      ) : (
        <Link
          href={href}
          className={className}
          aria-label={label}
          aria-current={isActive ? 'page' : undefined}
        >
          {linkContent}
        </Link>
      )}
    </motion.div>
  );
}
