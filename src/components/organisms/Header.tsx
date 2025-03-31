'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { FaBars, FaGithub, FaHome, FaInfoCircle, FaShoppingBag, FaTimes } from 'react-icons/fa';

import NavLink from '@/components/atoms/NavLink';
import ThemeSwitcher from '@/components/atoms/ThemeSwitcher';
import { mobileMenuVariants, mobileNavItemVariants } from '@/lib/animations/headerAnimations';

interface HeaderProps {
  showNav?: boolean;
}

export default function Header({ showNav = true }: HeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActivePath = (path: string) => {
    const currentPath = pathname || '';
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  return (
    <header
      className="sticky top-0 z-50 w-full shadow-sm bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm"
      data-testid="main-header"
    >
      <div className="container px-4 py-4 mx-auto sm:px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 md:w-1/4"
          >
            <Link href="/" className="flex items-center">
              <FaShoppingBag className="w-8 h-8 text-gray-800 dark:text-gray-100" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-gray-100">
                E-Commerce Shop
              </span>
            </Link>
          </motion.div>

          <div className="flex items-center md:hidden">
            <ThemeSwitcher />
            {showNav && (
              <motion.button
                className="p-2 ml-3 text-gray-600 transition-colors dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle menu"
                data-testid="mobile-menu-toggle"
              >
                {mobileMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
              </motion.button>
            )}
          </div>

          {showNav && (
            <nav className="items-center hidden md:flex md:justify-center md:w-2/4">
              <div className="flex space-x-6 justify-center">
                <NavLink
                  href="/"
                  icon={<FaHome className="text-xl" />}
                  label="Home"
                  isActive={isActivePath('/') && !isActivePath('/products')}
                />

                <NavLink
                  href="/products"
                  icon={<FaShoppingBag className="text-xl" />}
                  label="Products"
                  isActive={isActivePath('/products')}
                />

                <NavLink
                  href="/about"
                  icon={<FaInfoCircle className="text-xl" />}
                  label="About"
                  isActive={isActivePath('/about')}
                />

                <NavLink
                  href="https://github.com/khakiiman/react-e-commerce"
                  icon={<FaGithub className="text-xl" />}
                  label="GitHub"
                  isExternal
                />
              </div>
            </nav>
          )}

          <div className="hidden md:flex md:justify-end md:w-1/4">
            <ThemeSwitcher />
          </div>
        </motion.div>

        {showNav && (
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                variants={mobileMenuVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="md:hidden"
              >
                <motion.nav className="flex flex-col pt-4 pb-6 space-y-4">
                  <motion.div variants={mobileNavItemVariants}>
                    <Link
                      href="/"
                      className={`flex items-center py-2 space-x-3 ${
                        isActivePath('/') && !isActivePath('/products')
                          ? 'text-gray-900 dark:text-white font-medium'
                          : 'text-gray-600 dark:text-gray-300'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <FaHome className="w-5 h-5" />
                      <span>Home</span>
                    </Link>
                  </motion.div>

                  <motion.div variants={mobileNavItemVariants}>
                    <Link
                      href="/products"
                      className={`flex items-center py-2 space-x-3 ${
                        isActivePath('/products')
                          ? 'text-gray-900 dark:text-white font-medium'
                          : 'text-gray-600 dark:text-gray-300'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <FaShoppingBag className="w-5 h-5" />
                      <span>Products</span>
                    </Link>
                  </motion.div>

                  <motion.div variants={mobileNavItemVariants}>
                    <Link
                      href="/about"
                      className={`flex items-center py-2 space-x-3 ${
                        isActivePath('/about')
                          ? 'text-gray-900 dark:text-white font-medium'
                          : 'text-gray-600 dark:text-gray-300'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <FaInfoCircle className="w-5 h-5" />
                      <span>About</span>
                    </Link>
                  </motion.div>

                  <motion.div variants={mobileNavItemVariants}>
                    <a
                      href="https://github.com/khakiiman/react-e-commerce"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center py-2 space-x-3 text-gray-600 dark:text-gray-300"
                    >
                      <FaGithub className="w-5 h-5" />
                      <span>GitHub</span>
                    </a>
                  </motion.div>
                </motion.nav>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </header>
  );
}
