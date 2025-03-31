'use client';

import { motion } from 'framer-motion';
import { FaMoon, FaSun } from 'react-icons/fa';

import { useTheme } from '@/contexts/ThemeContext';

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  const variants = {
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

  return (
    <motion.button
      onClick={toggleTheme}
      variants={variants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      className="flex flex-col items-center gap-1 text-gray-600 transition-colors dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      data-testid="theme-switcher"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 360 : 0 }}
        transition={{ duration: 0.3 }}
        className="text-xl"
      >
        {theme === 'dark' ? <FaMoon /> : <FaSun />}
      </motion.div>
      <span className="hidden text-xs md:flex">{theme === 'dark' ? 'Dark' : 'Light'}</span>
    </motion.button>
  );
}
