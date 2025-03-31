'use client';

import Link from 'next/link';
import React from 'react';
import { FaGithub } from 'react-icons/fa';

export default function AppFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 bg-gray-100 dark:bg-gray-800">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-sm text-gray-600 dark:text-gray-300">
            © {currentYear} E-Commerce Shop. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/about"
              className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              About
            </Link>
            <Link
              href="/products"
              className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              Products
            </Link>
            <a
              href="https://github.com/khakiiman/react-e-commerce"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              <FaGithub className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
