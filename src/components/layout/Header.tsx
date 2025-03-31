'use client';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { FaBars, FaGithub, FaHome, FaInfoCircle, FaShoppingBag, FaTimes } from 'react-icons/fa';

import ThemeSwitcher from '../theme/ThemeSwitcher';
interface HeaderProps {
  showNav?: boolean;
}
const Header: React.FC<HeaderProps> = ({ showNav = true }) => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navItemVariants = {
    initial: { opacity: 0, y: -10 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
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
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        when: 'afterChildren',
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.3,
        when: 'beforeChildren',
        staggerChildren: 0.05,
        staggerDirection: 1,
      },
    },
  };
  const mobileNavItemVariants = {
    closed: { opacity: 0, x: -10 },
    open: { opacity: 1, x: 0 },
  };
  const isActivePath = (path: string) => {
    const currentPath = pathname || '';
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };
  return (
    <header className="sticky top-0 z-50 w-full shadow-sm bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
      <div className="container px-4 py-4 mx-auto sm:px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between"
        >
          {}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <Link href="/" className="flex items-center">
              <FaShoppingBag className="w-8 h-8 text-gray-800 dark:text-gray-100" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-gray-100">
                E-Commerce Shop
              </span>
            </Link>
          </motion.div>
          {}
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
          {}
          {showNav && (
            <nav className="items-center hidden space-x-6 md:flex">
              <motion.div
                custom={0}
                variants={navItemVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
              >
                <Link
                  href="/"
                  className="flex flex-col items-center gap-1 text-gray-600 transition-colors dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  aria-label="Home"
                >
                  <FaHome className="text-xl" />
                  <span className="text-xs">Home</span>
                  {isActivePath('/') && !isActivePath('/products') && (
                    <motion.span
                      layoutId="activeIndicator"
                      className="block w-full h-0.5 mt-1 bg-gray-900 rounded-full dark:bg-gray-100"
                    ></motion.span>
                  )}
                </Link>
              </motion.div>
              <motion.div
                custom={1}
                variants={navItemVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
              >
                <Link
                  href="/products"
                  className={`flex flex-col items-center gap-1 transition-colors ${
                    isActivePath('/products')
                      ? 'text-gray-900 dark:text-white font-medium'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                  aria-label="Products"
                  aria-current={isActivePath('/products') ? 'page' : undefined}
                >
                  <FaShoppingBag className="text-xl" />
                  <span className="text-xs">Products</span>
                  {isActivePath('/products') && (
                    <motion.span
                      layoutId="activeIndicator"
                      className="block w-full h-0.5 mt-1 bg-gray-900 rounded-full dark:bg-gray-100"
                    ></motion.span>
                  )}
                </Link>
              </motion.div>
              <motion.div
                custom={2}
                variants={navItemVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
              >
                <Link
                  href="/about"
                  className={`flex flex-col items-center gap-1 transition-colors ${
                    isActivePath('/about')
                      ? 'text-gray-900 dark:text-white font-medium'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                  aria-label="About"
                  aria-current={isActivePath('/about') ? 'page' : undefined}
                >
                  <FaInfoCircle className="text-xl" />
                  <span className="text-xs">About</span>
                  {isActivePath('/about') && (
                    <motion.span
                      layoutId="activeIndicator"
                      className="block w-full h-0.5 mt-1 bg-gray-900 rounded-full dark:bg-gray-100"
                    ></motion.span>
                  )}
                </Link>
              </motion.div>
              <motion.div
                custom={3}
                variants={navItemVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
              >
                <a
                  href="https://github.com/khakiiman/react-e-commerce"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1 text-gray-600 transition-colors dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  aria-label="GitHub Repository"
                >
                  <FaGithub className="text-xl" />
                  <span className="text-xs">GitHub</span>
                </a>
              </motion.div>
            </nav>
          )}
          {}
          <div className="items-center hidden space-x-4 md:flex">
            <motion.div
              custom={6}
              variants={navItemVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              whileTap="tap"
              className="pl-3 border-l border-gray-200 dark:border-gray-700"
            >
              <ThemeSwitcher />
            </motion.div>
          </div>
        </motion.div>
        {}
        {showNav && (
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                className="md:hidden"
                variants={mobileMenuVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <motion.nav className="flex flex-col py-4 mt-2 space-y-3 border-t border-gray-200 dark:border-gray-700">
                  <motion.div className="flex justify-between" variants={mobileNavItemVariants}>
                    <Link
                      href="/"
                      className={`flex items-center gap-3 px-2 py-2 rounded-md ${
                        isActivePath('/') && !isActivePath('/products')
                          ? 'text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800'
                          : 'text-gray-600 dark:text-gray-300'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <FaHome className="text-xl" />
                      <span>Home</span>
                    </Link>
                  </motion.div>
                  <motion.div variants={mobileNavItemVariants}>
                    <Link
                      href="/products"
                      className={`flex items-center gap-3 px-2 py-2 rounded-md ${
                        isActivePath('/products')
                          ? 'text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800'
                          : 'text-gray-600 dark:text-gray-300'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <FaShoppingBag className="text-xl" />
                      <span>Products</span>
                    </Link>
                  </motion.div>
                  <motion.div variants={mobileNavItemVariants}>
                    <Link
                      href="/about"
                      className={`flex items-center gap-3 px-2 py-2 rounded-md ${
                        isActivePath('/about')
                          ? 'text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800'
                          : 'text-gray-600 dark:text-gray-300'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <FaInfoCircle className="text-xl" />
                      <span>About</span>
                    </Link>
                  </motion.div>
                  <motion.div variants={mobileNavItemVariants}>
                    <a
                      href="https://github.com/khakiiman/react-e-commerce"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-2 py-2 text-gray-600 rounded-md dark:text-gray-300"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <FaGithub className="text-xl" />
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
};
export default Header;
